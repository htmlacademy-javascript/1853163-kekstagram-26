import {createPhotosDescriptionArray} from './data.js';
import {openPicture} from './openPhoto.js';

const photoContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content;
const photoListFragment = document.createDocumentFragment();

const photosArray = createPhotosDescriptionArray();

photosArray.forEach((item) => {
  const element = photoTemplate.cloneNode(true);
  const pictureImg = element.querySelector('.picture__img');
  pictureImg.src = item.url;
  const likes = element.querySelector('.picture__likes');
  likes.innerText = item.likes;
  const comments = element.querySelector('.picture__comments');
  comments.innerText = item.comments.length;
  const picture = element.querySelector('.picture');
  picture.addEventListener('click', () => openPicture(item));
  photoListFragment.append(element);
});

photoContainer.appendChild(photoListFragment);
