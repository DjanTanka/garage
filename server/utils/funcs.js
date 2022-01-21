module.exports = getRandomNum = (min, max) => {
  return Math.random() * (max - min) + min;
};