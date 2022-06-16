//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export const getRandomIntInclusive = (min, max) => {
  const minValue = Math.ceil(Math.min(min, max));
  const maxValue = Math.floor(max);

  if (min >= 0 && max >= 0) {
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  }
  return 0;
};

export const getRandomValueFromArray = (arr) => {
  const indexOfText = getRandomIntInclusive(0, arr.length - 1);

  return arr[indexOfText];
};

const checkStringLength = (string, maxLength) => string.length < maxLength;

checkStringLength('jfvdkjdknldfmlv', 16);
