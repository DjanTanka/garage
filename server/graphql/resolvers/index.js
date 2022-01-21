const authResolver = require("./auth");
const ordersResolver = require("./orders");
const carResolver = require("./cars");
const garageResolver = require("./garages");
const refresherResolver = require("../../middleware/refresh-check");

const rootResolver = {
  ...authResolver,
  ...ordersResolver,
  ...carResolver,
  ...garageResolver,
  ...refresherResolver,
};

module.exports = rootResolver;
