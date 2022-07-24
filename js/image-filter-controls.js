const imageUploadPreview = document.querySelector('.img-upload__preview');
const slider = document.querySelector('.effect-level__slider');
const sliderWrapper = document.querySelector('.img-upload__effect-level');
const imageEffectsButtons = document.getElementsByClassName('effects__radio');

sliderWrapper.classList.add('hidden');

let currentEffect = 'none';

const getEffectData = (name) => {
  const EFFECTS = {
    chrome: {
      style: 'grayscale',
      min: 0,
      max: 1,
      step: 0.1,
      unit: '',
    },
    sepia: {
      style: 'sepia',
      min: 0,
      max: 1,
      step: 0.1,
      unit: '',
    },
    marvin: {
      style: 'invert',
      min: 0,
      max: 100,
      step: 1,
      unit: '%',
    },
    phobos: {
      style: 'blur',
      min: 0,
      max: 3,
      step: 0.1,
      unit: 'px',
    },
    heat: {
      style: 'brightness',
      min: 1,
      max: 3,
      step: 0.1,
      unit: '',
    },
  };

  return EFFECTS[name];
};

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 1,
  connect: 'lower',
});

for (let i = 0; i < imageEffectsButtons.length; i++) {
  const current = imageEffectsButtons[i];

  current.addEventListener('click', () => {
    currentEffect = current.value;

    if (currentEffect === 'none') {
      sliderWrapper.classList.add('hidden');
      imageUploadPreview.style = '';
      return;
    }

    sliderWrapper.classList.remove('hidden');

    const {max, min, step, style, unit} = getEffectData(currentEffect);

    imageUploadPreview.style = `filter: ${style}(${max}${unit})`;

    slider.noUiSlider.updateOptions({
      range: {
        min,
        max,
      },
      step,
    });
    slider.noUiSlider.set(max);
  });
}

slider.noUiSlider.on('update', () => {
  const {style, unit} = getEffectData(currentEffect);
  const value = slider.noUiSlider.get();

  imageUploadPreview.style = `filter: ${style}(${value}${unit})`;
});


