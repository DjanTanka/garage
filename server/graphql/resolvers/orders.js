const Order = require("../../models/order");
const roles = require("../../utils/consts");

module.exports = {
  orders: async ({}, { isAuth, thisUser }) => {
    if (!isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      if (thisUser.role === roles.master || thisUser.role === roles.admin) {
        return await Order.find();
      } else if (thisUser.role === roles.user) {
        return await Order.find({ userId: thisUser.userId });
      } else {
        throw new Error("No access!");
      }
    } catch (err) {
      throw err;
    }
  },

  createOrder: async ({ orderInput }, { isAuth, thisUser }) => {
    const { garageId, carId, userId, masterId, title, description } =
      orderInput;
    if (!isAuth) {
      throw new Error("Unauthenticated!");
    }
    if (thisUser.role === roles.user || thisUser.role === roles.admin) {
      try {
        const order = new Order({
          garageId,
          carId,
          userId,
          masterId,
          title,
          description,
          priority: "-",
          status: "Not started",
          dateAdd: new Date(),
          dateStart: "-",
          dateEnd: "-",
        });
        const result = await order.save();
        return result;
      } catch (err) {
        console.log(err);
        throw err;
      }
    } else {
      throw new Error("No access!");
    }
  },

  deleteOrder: async ({ id }, { isAuth, thisUser }) => {
    if (!isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      if (thisUser.role === roles.user) {
        const order = await Order.findOne({ userId: thisUser.userId });
        if (thisUser.userId === order.userId) {
          return Order.findOneAndDelete({ _id: id });
        }
      } else if (thisUser.role === roles.master || thisUser.role === roles.admin) {
        return Order.findOneAndDelete({ _id: id });
      } else {
        throw new Error("No access!");
      }
    } catch (err) {
      console.log(err);
    }
  },

  updateOrder: async ({ orderInputUpdate }, { isAuth, thisUser }) => {
    const { _id } = orderInputUpdate;
    if (!isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      if (thisUser.role === roles.master || thisUser.role === roles.admin) {
        Order.updateOne({ _id: _id }, orderInputUpdate);
        const result = Order.findOne({ _id: _id });
        return result;
      } else {
        throw new Error("No access!");
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
