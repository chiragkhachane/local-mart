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

  stripe_connect_test_client_id: "ca_IpdSleJKRHel8sQB402NTFQbWmxwuuNy",
  stripe_test_secret_key:
    "sk_test_51IDxvmGENzKU2dPwmkzTnR1v2P8JseEiAdDQbsxoPJ3AY0pRyrtMe5aT6ZOn3sD5NNGPMPXMlyEsVxhoMcc2UjCd00ytwJqUVR",
  stripe_test_api_key:
    "pk_test_51IDxvmGENzKU2dPwn1CIhOAKtRn8RY78Gg6LeUNlq6GOtbS6MWBLCCohf2WbgACsyqMrbY4xdj6n4SZ3McFVbjUF003NlTJ0ex",
  AWS_ACCESS_KEY_ID: "",
  AWS_SECRET_ACCESS_KEY: "",
  AWS_REGION: "us-east-1",
  EMAIL_FROM: "persistent2021@gmail.com",
  EMIAL_PW: "beproject",
  GEOCODER_API_KEY: "AIzaSyCgprdJj4mS8pDdtsctNoEJTQTAEvmeyqE",
};

export default config;
