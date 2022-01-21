const Car = require("../../models/car");
const axios = require('axios')

module.exports = {
  cars: async ({userId}, { isAuth, thisUser }) => {
    if (!isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      if (thisUser.role === roles.user) {
        return await Car.find({ userId });
      } else if (
        thisUser.role === roles.admin ||
        thisUser.role === roles.security
      ) {
        return await Car.find();
      } else {
        throw new Error("No access!");
      }
    } catch (err) {
      throw err;
    }
  },

  createCar: async ({ carInput }, { isAuth, thisUser }) => {
    const { userId, garageId, model, registrationNumber, vinCode, mileage, carDate} =
      carInput;
    if (!isAuth) {
      throw new Error("Unauthenticated!");
    }
    if ( thisUser.role === roles.user || roles.master ||roles.admin ) {
      const { data } = await axios({
        method: "post",
        url: "https://vrkhpxz5u8.execute-api.us-east-2.amazonaws.com/vehical/vehicleWear",
        data: {
          T: carDate,
          L: mileage,
          model
        }
      })
      const vehicalWeare = data.body
      const car = new Car({
        userId,
        garageId,
        model,
        registrationNumber,
        vinCode,
        mileage,
        vehicalWeare,
        details: [],
      });
      car.details = [
        {
          carId: car._id,
          unitType: "engine",
          installed: 0,
          resource: 1000000,
          needToChange: 1000000,
          condition: "fine",
        },
        {
          carId: car._id,
          unitType: "oil",
          installed: 0,
          resource: 10000,
          needToChange: 10000,
          condition: "fine",
        },
        {
          carId: car._id,
          unitType: "oil filter",
          installed: 0,
          resource: 10000,
          needToChange: 10000,
          condition: "fine",
        },
        {
          carId: car._id,
          unitType: "air filter",
          installed: 0,
          resource: 10000,
          needToChange: 10000,
          condition: "fine",
        },
        {
          carId: car._id,
          unitType: "cabin filter",
          installed: 0,
          resource: 10000,
          needToChange: 10000,
          condition: "fine",
        },
        {
          carId: car._id,
          unitType: "tires",
          installed: 0,
          resource: 40000,
          needToChange: 40000,
          condition: "fine",
        },
        {
          carId: car._id,
          unitType: "silencer",
          installed: 0,
          resource: 100000,
          needToChange: 100000,
          condition: "fine",
        },
        {
          carId: car._id,
          unitType: "shock absorbers front",
          installed: 0,
          resource: 40000,
          needToChange: 40000,
          condition: "fine",
        },
        {
          carId: car._id,
          unitType: "shock absorbers rear",
          installed: 0,
          resource: 40000,
          needToChange: 40000,
          condition: "fine",
        },
        {
          carId: car._id,
          unitType: "battery",
          installed: 0,
          resource: 60000,
          needToChange: 60000,
          condition: "fine",
        },
        {
          carId: car._id,
          unitType: "timing belt",
          installed: 0,
          resource: 30000,
          needToChange: 30000,
          condition: "fine",
        },
        {
          carId: car._id,
          unitType: "silent blocks front",
          installed: 0,
          resource: 20000,
          needToChange: 20000,
          condition: "fine",
        },
        {
          carId: car._id,
          unitType: "silent blocks rear",
          installed: 0,
          resource: 20000,
          needToChange: 20000,
          condition: "fine",
        },
        {
          carId: car._id,
          unitType: "antifreeze",
          installed: 0,
          resource: 50000,
          needToChange: 50000,
          condition: "fine",
        },
        {
          carId: car._id,
          unitType: "brake fluid",
          installed: 0,
          resource: 50000,
          needToChange: 50000,
          condition: "fine",
        },
        {
          carId: car._id,
          unitType: "brake pads front",
          installed: 0,
          resource: 30000,
          needToChange: 30000,
          condition: "fine",
        },
        {
          carId: car._id,
          unitType: "brake pads rear",
          installed: 0,
          resource: 30000,
          needToChange: 30000,
          condition: "fine",
        },
        {
          carId: car._id,
          unitType: "brake discs",
          installed: 0,
          resource: 100000,
          needToChange: 100000,
          condition: "fine",
        },
        {
          carId: car._id,
          unitType: "brake drums",
          installed: 0,
          resource: 100000,
          needToChange: 100000,
          condition: "fine",
        },
        {
          carId: car._id,
          unitType: "conditioner",
          installed: 0,
          resource: 50000,
          needToChange: 50000,
          condition: "fine",
        },
        {
          carId: car._id,
          unitType: "clutch",
          installed: 0,
          resource: 50000,
          needToChange: 50000,
          condition: "fine",
        },
        {
          carId: car._id,
          unitType: "spark plugs",
          installed: 0,
          resource: 30000,
          needToChange: 30000,
          condition: "fine",
        },
      ];
      await car.save()
      return await Car.find({ userId })
    } else {
      throw new Error("No access!");
    }
  },

  addDetail: async ({ detailInput }, { isAuth, thisUser }) => {
    if (!isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      if (thisUser.role === roles.master) {
        await Car.updateOne(
          { _id: detailInput.carId },
          { $addToSet: { details: detailInput } }
        );
        const car = await Car.findOne({ _id: detailInput.carId });
        return car;
      } else {
        throw new Error("No access!");
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  deleteCar: async ({ id }, { isAuth, thisUser }) => {
    if (!isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      if (thisUser.role === roles.user) {
        const car = await Car.findOne({ userId: thisUser.userId });
        if (thisUser.userId === car.userId) {
          const rez = await Car.findOneAndDelete({ _id: id });
          return await Car.find({userId: thisUser.userId })
        }
      } else if (
        thisUser.role === roles.master ||
        thisUser.role === roles.admin
      ) {
        await Car.findOneAndDelete({ _id: id });
        return await Car.find({userId: id }).exec()
      } else {
        throw new Error("No access!");
      }
    } catch (err) {
      console.log(err);
    }
  },

  updateCar: async ({ carInputUpdate }, { isAuth, thisUser }) => {
    const { _id } = carInputUpdate;
    if (!isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      if (thisUser.role === roles.master) {
        await Car.updateOne({ _id: _id }, carInputUpdate);
        const car = await Car.findOne({ _id: _id });
        const result = await car.save();
        return result;
      } else {
        throw new Error("No access!");
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  deleteDetail: async ({ unitType, carId }, { isAuth, thisUser }) => {
    if (!isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      if (thisUser.role === roles.master) {
        await Car.updateOne({}, { $pull: { details: { unitType: unitType } } });
        const car = await Car.findOne({ _id: carId });
        return car;
      } else {
        throw new Error("No access!");
      }
    } catch (err) {
      console.log(err);
    }
  },

  updateDetail: async ({ detailsInputUpdate }, { isAuth, thisUser }) => {
    const {
      index,
      carId,
      unitType,
      installed,
      resource,
      needToChange,
      condition,
    } = detailsInputUpdate;
    if (!isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      if (thisUser.role === roles.master) {
        await Car.updateOne(
          { _id: carId },
          {
            $set: {
              [`details.${index}`]: {
                unitType: unitType,
                installed: installed,
                resource: resource,
                needToChange: needToChange,
                condition: condition,
              },
            },
          }
        );
        const car = await Car.findOne({ _id: carId });
        return car;
      } else {
        throw new Error("No access!");
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
