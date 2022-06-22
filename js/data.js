import {getRandomIntInclusive, getRandomValueFromArray} from './util.js';

const COMMENTS_NAME_ARRAY = [
  'Liam', 'Olivia',
  'Noah', 'Emma',
  'Oliver', 'Charlotte',
  'Elijah', 'Amelia',
  'James', 'Ava',
  'William', 'Sophia',
  'Benjamin', 'Isabella',
  'Lucas', 'Mia',
  'Henry', 'Evelyn',
  'Theodore', 'Harper'
];

const COMMENTS_TEXT_ARRAY = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.', 'Как можно было поймать такой неудачный момент?!'
];

let lastId = 1;

const createCommentsArray = () => {
  const commentsArray = [];
  const numberOfComments = getRandomIntInclusive(1, 3);

  for (let i = 0; i < numberOfComments; i++) {
    const comment = {
      text: getRandomValueFromArray(COMMENTS_TEXT_ARRAY),
      name: getRandomValueFromArray(COMMENTS_NAME_ARRAY),
      avatar: `img/avatar-${getRandomIntInclusive(1, 6)}.svg`,
      id: lastId++,
    };
    commentsArray.push(comment);
  }

  return commentsArray;
};

const createPhotosDescription = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: `description-${index}`,
  likes: getRandomIntInclusive(15, 200),
  comments: createCommentsArray(),
});

const createPhotosDescriptionArray = () => {
  const result = [];

  for (let i = 1; i <= 25; i++) {
    const photoDescription = createPhotosDescription(i);
    result.push(photoDescription);
  }

  return result;
};

export {createPhotosDescriptionArray};
