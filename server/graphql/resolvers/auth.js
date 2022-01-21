const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const generateToken = require("../../utils/secret");
const roles = require("../../utils/consts");
const getRandomNum = require("../../utils/funcs");
const MailService = require("../../middleware/mail-verifier");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async ({ userInput }) => {
    const { password, email, firstName, lastName } = userInput;
    if (!password || !email || !firstName || !lastName) {
      throw new Error("Some field is empty");
    }
    const correctEmail = email.match(/[-.\w]+@([\w-]+\.)+[\w-]+/g);
    const correctPassword = password.match(
      /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){6,50}$/i
    );
    if (!correctEmail || !correctPassword) throw new Error("Wrong data.");
    try {
      const isOccupied = await User.findOne({
        email: email,
      });
      if (isOccupied) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(password, 5);
      const activationCode = Math.floor(getRandomNum(10000, 99999)).toString();
      const hashedActNum = await bcrypt.hash(activationCode, 5);
      const user = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: roles.user,
        balance: 0,
        isActivated: false,
        actNum: hashedActNum,
      });
      await MailService.sendActivationMail(email, activationCode);
      const result = await user.save();
      return { ...result._doc, password: hashedPassword, _id: result.id };
    } catch (err) {
      throw err;
    }
  },

  activateUser: async ({ userActivateInput }) => {
    const { email, actNum } = userActivateInput
    try {
      const user = await User.findOne({ email: email });
      if (user.isActivated) throw new Error("User is already activated!");
      if (await bcrypt.compare(actNum, user.actNum)) {
        userActivateInput.isActivated = true;
        userActivateInput.actNum = null;
      } else {
        throw new Error("Wrong verify code!");
      }
      await User.updateOne({ email: email }, userActivateInput);
      const activatedUser = await User.findOne({ email: email })
      return activatedUser
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  login: async ({userLoginInput}) => {
    const {email, password, googleId, firstName, lastName  } = userLoginInput
    const user = await User.findOne({ email: email });
    if(!user){
      throw new Error('User not found!')
    }
    if (!user && googleId && firstName && lastName) {
      const hashedGoogleId = await bcrypt.hash(googleId, 5);
      const user = new User({
        email,
        password: hashedGoogleId,
        firstName,
        lastName,
        role: roles.user,
        balance: 0,
        isActivated: true,
        actNum: null,
      });
      await user.save();
      const tokenA = await generateToken(user.id, user.role, null, "30m");
      const tokenR = await generateToken(null, null, user.email, "30d");
      return { tokenA, tokenR };
    }
    if (!user.isActivated) {
      throw new Error("Account is not activated!");
    }
    if (!googleId) {
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error("Password or e-mail is incorrect!");
      }
    }
    const tokenA = await generateToken(user.id, user.role, null, "30m");
    const tokenR = await generateToken(null, null, user.email, "30d");
    return { tokenA, tokenR, user};
  },

  getNewActNum: async ({ getNewActNumInput }) => {
    const { email } = getNewActNumInput;
    try {
      const activationCode = Math.floor(getRandomNum(10000, 99999)).toString();
      const hashedActNum = await bcrypt.hash(activationCode, 5);
      getNewActNumInput.actNum = hashedActNum;
      await User.updateOne({ email: email }, getNewActNumInput);
      await MailService.sendActivationMail(email, activationCode);
      return { email, actNum: hashedActNum };
    } catch (err) {
      console.log(err);
    }
  },

  changePassword: async ({ changePasswordInput }) => {
    const { email, firstPassword, secondPassword, actNum } =
      changePasswordInput;
    try {
      const user = await User.findOne({ email: email });
      if (firstPassword === secondPassword) {
        if (
          (correctPassword = firstPassword.match(
            /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){6,50}$/i
          ))
        ) {
          const isEqual = await bcrypt.compare(actNum, user.actNum);
          if (isEqual) {
            const hashedPassword = await bcrypt.hash(firstPassword, 5);
            changePasswordInput.password = hashedPassword;
            changePasswordInput.actNum = null;
            await User.updateOne({ email: email }, changePasswordInput);
            return {
              email,
              actNum: changePasswordInput.actNum,
              password: hashedPassword,
            };
          } else {
            throw new Error("Wrong secret code!");
          }
        } else {
          throw new Error("Wrong password format!");
        }
      } else {
        throw new Error("Passwords are not the same!");
      }
    } catch (err) {
      console.log(err);
    }
  },

  changeUserRole: async ({ userInputUpdate }, { isAuth, thisUser }) => {
    const { email, role } = userInputUpdate;
    if (!isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      if (thisUser.role === roles.admin) {
        const user = await User.findOne({ email: email });
        if (user._id === thisUser._id) {
          throw new Error("You can not change your own role!");
        }
        const {
          _id,
          password,
          firstName,
          lastName,
          balance,
          isActivated,
          actNum,
        } = user;
        const updatedUser = {
          _id,
          email,
          password,
          firstName,
          lastName,
          role,
          balance,
          isActivated,
          actNum,
        };
        await User.updateOne({ email: email }, updatedUser);
        return user;
      } else {
        throw new Error("No access!");
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  deleteUser: async ({ email }, { isAuth, thisUser }) => { 
    if (!isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      if (true) {
        return await User.findOneAndDelete({ email: email });
      } else {
        throw new Error("No access!");
      }
    } catch (err) {
      console.log(err);
    }
  },
  
  getUserById: async({id}, { isAuth, thisUser }) => {
    try {
      const user = await User.findOne({ _id: id });
      return user
    } catch(err) {
      console.log(err)
    }
  },
  
  getAllUsersForChecking: async(_, {isAuth}) => {  
    try {
      const users = await User.find();
      return users
    } catch (err) {
      console.log(err);
    } 
  },
};
