const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseBtn = document.querySelector('.big-picture__cancel');

const openPicture = (pictureData) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  const pictureImg = bigPicture.querySelector('.big-picture__img img');
  pictureImg.src = pictureData.url;

  const likes = bigPicture.querySelector('.likes-count');
  likes.innerText = pictureData.likes;

  const comments = bigPicture.querySelector('.comments-count');
  comments.innerText = pictureData.comments.length;

  const description = bigPicture.querySelector('.social__caption');
  description.innerText = pictureData.description;

  const photoCommentsFragment = document.createDocumentFragment();
  pictureData.comments.forEach((item) => {
    const currentEl = document.createElement('li');
    currentEl.classList.add('social__comment');
    currentEl.innerHTML = `<img
        class="social__picture"
        src="${item.avatar}"
        alt="${item.name}"
        width="35" height="35"><p class="social__text">${item.text}</p>`;
    photoCommentsFragment.appendChild(currentEl);
  });

  const socialComments = bigPicture.querySelector('.social__comments');
  socialComments.innerHTML = '';
  socialComments.appendChild(photoCommentsFragment);

  const socialCommentCount = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

const closePicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

bigPictureCloseBtn.addEventListener('click', closePicture);

document.addEventListener('keydown',(e) => {
  if(e.key === 'Escape') {
    closePicture();
  }
});

export {openPicture};
