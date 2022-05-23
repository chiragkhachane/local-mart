import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import auth from "./../auth/auth-helper";
import { Redirect } from "react-router-dom";
import { signin } from "./api-auth.js";
import Gcon from "../auth/icon";
import { GoogleLogin } from "react-google-login";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
}));

export default function Signin(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: "", redirectToReferrer: true });
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const googleSuccess = async (res) => {
    try {
      const user = {
        email: res?.profileObj.email || undefined,
        password: res?.googleId || undefined,
      };
      signin(user).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          auth.authenticate(data, () => {
            setValues({ ...values, error: "", redirectToReferrer: true });
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { from } = props.location.state || {
    from: {
      pathname: "/",
    },
  };
  const { redirectToReferrer } = values;
  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google sign in was Unsuccessful. Tray again later!");
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" className={classes.title}>
          Sign In
        </Typography>
        <TextField
          id="email"
          type="email"
          label="Email"
          className={classes.textField}
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
        />
        <br />
        <TextField
          id="password"
          type="password"
          label="Password"
          className={classes.textField}
          value={values.password}
          onChange={handleChange("password")}
          margin="normal"
        />
        <br />{" "}
        {values.error && (
          <Typography component="p" color="error">
            <Icon color="error" className={classes.error}>
              error
            </Icon>
            {values.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          onClick={clickSubmit}
          className={classes.submit}
        >
          Submit
        </Button>
      </CardActions>
      <GoogleLogin
        clientId="666280700054-ea5grasoboq4gt7a1gc0un7h81bvs5cc.apps.googleusercontent.com"
        render={(renderProps) => (
          <Button
            className={classes.googleButton}
            color="secondary"
            onClick={renderProps.onClick}
            disable={renderProps.disable}
            startIcon={<Gcon />}
            variant={"contained"}
          >
            Sign In with Google
          </Button>
        )}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy="single_host_origin"
      ></GoogleLogin>
    </Card>
  );
}
