const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    "mongodb+srv://chirag:beproject@nodeapi.boztv.mongodb.net/NodeAPI?retryWrites=true&w=majority" ||
    process.env.MONGO_HOST,
  // "mongodb://" +
  //   (process.env.IP || "localhost") +
  //   ":" +
  //   (process.env.MONGO_PORT || "27017") +
  //   "/NodeAPI",

  stripe_connect_test_client_id: "",
  stripe_test_secret_key:
    "",
  stripe_test_api_key:
    "",
  AWS_ACCESS_KEY_ID: "",
  AWS_SECRET_ACCESS_KEY: "",
  AWS_REGION: "us-east-1",
  EMAIL_FROM: "",
  EMIAL_PW: "",
  GEOCODER_API_KEY: "",
};

export default config;
