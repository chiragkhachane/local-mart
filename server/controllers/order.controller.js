import { Order, CartItem } from "../models/order.model";
import errorHandler from "./../helpers/dbErrorHandler";
import config from "../../config/config";

var nodemailer = require("nodemailer");

function sendMail(order) {
  // console.log(order);

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.EMAIL_FROM,
      pass: config.EMIAL_PW,
    },
  });

  var mailOptions = {
    from: "persistent2021@gmail.com",
    to: order.customer_email,
    subject: "Order Sucessfull from local-mart",
    html: `<div style="padding:10px; margin:10px;height: 300px; width: 400px;border: 3px solid black; border-radius:25px; background-image: url(https://images.unsplash.com/photo-1528458876861-544fd1761a91?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzZ8fGNhcmR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60)">
            <h3>Hello ${order.customer_name}.</h1><hr>
            <p>
              Order placed sucessfully! <br>
              Date: ${new Date()}! <br>
              Order ID: ${order._id} <br>
              Payment ID: ${order.payment_id} <br>
              Deliver Address: ${order.delivery_address.street} ${
      order.delivery_address.city
    } ${order.delivery_address.state} ${order.delivery_address.zipcode} ${
      order.delivery_address.country
    } <br>
            </p>
            </div>
            `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

const create = async (req, res) => {
  try {
    req.body.order.user = req.profile;
    let order = new Order(req.body.order);

    // console.log(order);
    let result = await order.save();
    sendMail(order);

    res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listByShop = async (req, res) => {
  try {
    let orders = await Order.find({ "products.shop": req.shop._id })
      .populate({ path: "products.product", select: "_id name price" })
      .sort("-created")
      .exec();
    res.json(orders);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const update = async (req, res) => {
  try {
    let order = await Order.updateOne(
      { "products._id": req.body.cartItemId },
      {
        "products.$.status": req.body.status,
      }
    );
    res.json(order);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const getStatusValues = (req, res) => {
  res.json(CartItem.schema.path("status").enumValues);
};

const orderByID = async (req, res, next, id) => {
  try {
    let order = await Order.findById(id)
      .populate("products.product", "name price")
      .populate("products.shop", "name")
      .exec();
    if (!order)
      return res.status("400").json({
        error: "Order not found",
      });
    req.order = order;
    next();
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listByUser = async (req, res) => {
  try {
    let orders = await Order.find({ user: req.profile._id })
      .sort("-created")
      .exec();
    res.json(orders);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const read = (req, res) => {
  return res.json(req.order);
};

export default {
  create,
  listByShop,
  update,
  getStatusValues,
  orderByID,
  listByUser,
  read,
};
