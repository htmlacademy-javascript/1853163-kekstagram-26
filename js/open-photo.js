import {isEscKeydown} from "./util.js";

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseBtn = document.querySelector('.big-picture__cancel');

const closePictureHandler = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', pictureEscapeHandler);
};

const pictureEscapeHandler = (evt) => {
  if (isEscKeydown(evt)) {
    closePictureHandler();
  }
};

bigPictureCloseBtn.addEventListener('click', closePictureHandler);

const openPicture = (pictureData) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', pictureEscapeHandler);

  const pictureImg = bigPicture.querySelector('.big-picture__img img');
  pictureImg.src = pictureData.url;

  const likes = bigPicture.querySelector('.likes-count');
  likes.textContent = pictureData.likes;

  const comments = bigPicture.querySelector('.comments-count');
  comments.textContent = pictureData.comments.length;

  const description = bigPicture.querySelector('.social__caption');
  description.textContent = pictureData.description;

  const photoCommentsFragment = document.createDocumentFragment();

  const socialComments = bigPicture.querySelector('.social__comments');
  const commentTemplate = socialComments.querySelector('.social__comment');
  pictureData.comments.forEach(({avatar, name, text}) => {
    const currentEl = commentTemplate.cloneNode(true);
    const currentImg = currentEl.querySelector('.social__picture');
    currentImg.src = avatar;
    currentImg.alt = name;
    const currentText = currentEl.querySelector('.social__text');
    currentText.textContent = text;

    photoCommentsFragment.appendChild(currentEl);
  });

  socialComments.textContent = '';
  socialComments.appendChild(photoCommentsFragment);

  const socialCommentCount = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

export {openPicture};
