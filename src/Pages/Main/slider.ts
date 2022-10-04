import BaseComponent from '../../Abstract/base-component';
import sliderTextFile from '../../Settings/slider-text.json';
import Services from '../../Interfaces/services';

export default class Slider extends BaseComponent {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', 'slider-wrapper');
  }

  render = () => {
    const sliderTextContainer = new BaseComponent('div', 'slider__text-container').element;
    const sliderDotsContainer = new BaseComponent('div', 'slider__controls-container').element;

    for (let i = 0; i < sliderTextFile.length; i += 1) {
      const inputSlider = new BaseComponent('input', 'slider__input-control').element;
      inputSlider.setAttribute('type', 'radio');
      inputSlider.setAttribute('name', 'radio');
      inputSlider.setAttribute('id', `slide${i}`);
      if (i === 0) inputSlider.setAttribute('checked', `true`);
      this.element.prepend(inputSlider);

      const itemSliderTxt = new BaseComponent('h4', 'text-container__item').element;
      itemSliderTxt.classList.add(`slide${i}`);
      itemSliderTxt.innerHTML = sliderTextFile[i];
      sliderTextContainer.appendChild(itemSliderTxt);

      const itemDots = new BaseComponent('label', 'controls-container__item').element;
      itemDots.setAttribute('for', `slide${i}`);
      sliderDotsContainer.append(itemDots);
    }
    this.element.append(sliderTextContainer, sliderDotsContainer);
    this.parent.appendChild(this.element);
  };
}
