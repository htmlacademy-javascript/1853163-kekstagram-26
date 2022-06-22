import {createPhotosDescriptionArray} from "./data.js";

const photoContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content;
const photoListFragment = document.createDocumentFragment();

const photosArray = createPhotosDescriptionArray();

photosArray.forEach(item => {
  const element = photoTemplate.cloneNode(true);
  const picture = element.querySelector('.picture__img');
  picture.src = item.url;
  const likes = element.querySelector('.picture__likes');
  likes.innerText = item.likes;
  const comments = element.querySelector('.picture__comments');
  comments.innerText = item.likes;
  photoListFragment.append(element);
});

photoContainer.appendChild(photoListFragment);
