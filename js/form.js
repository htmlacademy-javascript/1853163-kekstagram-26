import {checkStringLength, isEscKeydown} from "./util.js";

const body = document.querySelector('body');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCloseBtn = document.querySelector('.img-upload__cancel');
const imgUpload = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadComment = imgUploadForm.querySelector('.text__description');
const imgUploadHashTags = imgUploadForm.querySelector('.text__hashtags');

const closeImgFormHandler = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', escapeImgFormHandler);
  imgUploadForm.reset();
};

const escapeImgFormHandler = (evt) => {
  if (isEscKeydown(evt)) {
    closeImgFormHandler();
  }
};

const blockEscForFocused = (evt) => {
  if (isEscKeydown(evt)) {
    evt.stopPropagation();
  }
};

imgUploadComment.addEventListener('keydown', blockEscForFocused);
imgUploadHashTags.addEventListener('keydown', blockEscForFocused);

const openImgForm = () => {
  body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', escapeImgFormHandler);
};

imgUploadCloseBtn.addEventListener('click', closeImgFormHandler);

imgUpload.addEventListener('change', openImgForm);

const COMMENTS_LENGTH_MAX = 140;
const HASHTAGS_LENGTH_MAX = 5;

const COMMENTS_LENGTH_ERROR = `не больше ${COMMENTS_LENGTH_MAX} символов`;
const HASHTAGS_VALID_ERROR = 'невалидный хэштег';
const HASHTAGS_UNIQUE_ERROR = 'один и тот же хэш-тег не может быть использован дважды';
const HASHTAGS_LENGTH_ERROR = `нельзя указать больше ${HASHTAGS_LENGTH_MAX} хэш-тегов`;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__text'
});

const getHashTagsArrayFromString = (hashTagsString) => hashTagsString.toLowerCase().trim().split(' ');

const isCommentValid = (value) => {
  return checkStringLength(value, COMMENTS_LENGTH_MAX);
};

const isHashTagsValid = (value) => {
  const regExp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  const hashTagsArray = getHashTagsArrayFromString(value);
  return hashTagsArray.every((hashTag) => regExp.test(hashTag));
};

const isHashTagsUnique = (value) => {
  const hashTagsArray = getHashTagsArrayFromString(value);
  return hashTagsArray.length === new Set(hashTagsArray).size;
};

const isHashTagsLengthValid = (value) => {
  const hashTagsArray = getHashTagsArrayFromString(value);

  return hashTagsArray.length < HASHTAGS_LENGTH_MAX;
};

pristine.addValidator(imgUploadComment, isCommentValid, COMMENTS_LENGTH_ERROR);
pristine.addValidator(imgUploadHashTags, isHashTagsValid, HASHTAGS_VALID_ERROR);
pristine.addValidator(imgUploadHashTags, isHashTagsUnique, HASHTAGS_UNIQUE_ERROR);
pristine.addValidator(imgUploadHashTags, isHashTagsLengthValid, HASHTAGS_LENGTH_ERROR);

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


