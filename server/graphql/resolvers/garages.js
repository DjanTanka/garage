const Garage = require("../../models/garage");
const roles = require("../../utils/consts");

module.exports = {
  garages: async ({}, { isAuth, thisUser }) => {
    if (!isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      if (thisUser.role === roles.user) {
        return await Garage.find({ userId: thisUser.userId });
      } else if (
        thisUser.role === roles.admin ||
        thisUser.role === roles.security
      ) {
        return await Garage.find();
      } else {
        throw new Error("No access!");
      }
    } catch (err) {
      throw err;
    }
  },

  createGarage: async ({ garageInput }, { isAuth, thisUser }) => {
    const { userId, location, rent, freeSpace } = garageInput;
    if (!isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      if (thisUser.role === roles.admin) {
        const garage = new Garage({
          userId,
          location,
          rent,
          freeSpace,
        });
        const result = await garage.save();
        return result;
      } else {
        throw new Error("No access!");
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  deleteGarage: async ({ id }, { isAuth, thisUser }) => {
    if (!isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      if (thisUser.role === roles.admin) {
        return await Garage.findOneAndDelete({ _id: id });
      } else {
        throw new Error("No access!");
      }
    } catch (err) {
      console.log(err);
    }
  },

  updateGarage: async ({ garageInputUpdate }, { isAuth, thisUser }) => {
    const { _id } = garageInputUpdate;
    if (!isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      if (thisUser.role === roles.admin) {
        await Garage.updateOne({ _id: _id }, garageInputUpdate);
        const garage = await Garage.findOne({ _id: _id });
        const result = await garage.save();
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
