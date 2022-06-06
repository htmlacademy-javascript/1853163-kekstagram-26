//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomIntInclusive(2.5, 10.3);

function checkStringLength(string, maxLength) {
  return string.length < maxLength;
}

checkStringLength('jfvdkjdknldfmlv', 16);
