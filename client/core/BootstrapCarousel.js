import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import grandSale from "./../assets/images/grandSale.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5px",
    flexGrow: 10,
    height: "37vh",
  },
  paper: {
    marginTop: "-15px",
    marginBottom: "3px",
    height: "30vh",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const BootstrapCarousel = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid width={1}>
        <Paper className={classes.paper}>
          <Card>
            <CardMedia style={{ height: 320 }} image={grandSale}></CardMedia>
          </Card>
        </Paper>
      </Grid>
    </div>
  );
};

export default BootstrapCarousel;
