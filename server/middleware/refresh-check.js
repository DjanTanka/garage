module.exports = {
  refreshCheck: async ({}, { isAuth }) => {
    try {
      return { tokenA: isAuth, tokenR: "nothing to see here" };
    } catch (err) {
      throw new Error("Error!");
    }
  },
};
