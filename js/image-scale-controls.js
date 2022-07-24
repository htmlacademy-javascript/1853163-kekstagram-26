import {getNumWithPercentage} from './util.js';

const imageScaleValue = document.querySelector('.scale__control--value');
const imageScaleBigger= document.querySelector('.scale__control--bigger');
const imageScaleSmaller = document.querySelector('.scale__control--smaller');
const imageUploadPreview = document.querySelector('.img-upload__preview img');

const DEFAULT_SCALE_VALUE = 100;
const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const STEP = 25;

let currentScaleValue;

const setImageScaleValue = (newValue) => {
  currentScaleValue = newValue;
  imageScaleValue.value = getNumWithPercentage(currentScaleValue);
  imageUploadPreview.style = `transform: scale(${currentScaleValue/100})`;
};

setImageScaleValue(DEFAULT_SCALE_VALUE);

const increaseScaleValueHandler = () => {
  const newValue = Math.min(currentScaleValue + STEP, MAX_SCALE_VALUE);
  setImageScaleValue(newValue);
};

const decreaseScaleValueHandler = () => {
  const newValue = Math.max(currentScaleValue - STEP, MIN_SCALE_VALUE);
  setImageScaleValue(newValue);
};

imageScaleBigger.addEventListener('click', increaseScaleValueHandler);
imageScaleSmaller.addEventListener('click', decreaseScaleValueHandler);

