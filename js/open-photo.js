import {isEscKeydown} from './util.js';

import {createCommentsFragment} from "./data.js";

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseBtn = document.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const PART_OF_COMMENTS_TO_SHOW = 5;

const closePictureHandler = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', pictureEscapeHandler);
};

function pictureEscapeHandler(evt) {
  if (isEscKeydown(evt)) {
    closePictureHandler();
  }
}

bigPictureCloseBtn.addEventListener('click', closePictureHandler);

const openPicture = (pictureData) => {
  document.addEventListener('keydown', pictureEscapeHandler);

  const {comments, url, likes, description} = pictureData;
  const visibleComments = comments.slice(0, PART_OF_COMMENTS_TO_SHOW);
  bigPicture.classList.remove('hidden');

  if (comments.length > visibleComments.length) {
    commentsLoader.classList.remove('hidden');
  }

  body.classList.add('modal-open');

  const pictureImg = bigPicture.querySelector('.big-picture__img img');
  pictureImg.src = url;

  const likesCount = bigPicture.querySelector('.likes-count');
  likesCount.textContent = likes;

  const commentsCount = bigPicture.querySelector('.comments-count');
  commentsCount.textContent = comments.length;

  const visibleCommentsCount = bigPicture.querySelector('.visible-comments-count');
  visibleCommentsCount.textContent = visibleComments.length;

  const socialCaption = bigPicture.querySelector('.social__caption');
  socialCaption.textContent = description;

  const socialComments = bigPicture.querySelector('.social__comments');
  const commentTemplate = socialComments.querySelector('.social__comment');
  socialComments.textContent = '';

  const photoCommentsFragment = createCommentsFragment(visibleComments, commentTemplate);
  socialComments.appendChild(photoCommentsFragment);

  const loadMoreCommentsHandler = () => {
    const nextFiveComments = comments.slice(visibleComments.length, visibleComments.length + PART_OF_COMMENTS_TO_SHOW);
    visibleComments.push(...nextFiveComments);

    const newCommentsFragment = createCommentsFragment(nextFiveComments, commentTemplate);

    socialComments.appendChild(newCommentsFragment);

    visibleCommentsCount.textContent = visibleComments.length;

    if (visibleComments.length === comments.length) {
      commentsLoader.classList.add('hidden');
      commentsLoader.removeEventListener('click',loadMoreCommentsHandler);
    }
  };

  commentsLoader.addEventListener('click', loadMoreCommentsHandler)
};

bigPictureCloseBtn.addEventListener('click', closePictureHandler);

export {openPicture};
