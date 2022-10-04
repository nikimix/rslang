import BaseComponent from '../../Abstract/base-component';
import Services from '../../Interfaces/services';
import Slider from './slider';

export default class LeftContainerMain extends BaseComponent {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', 'main__left-container');
  }

  render = () => {
    const titleH1 = new BaseComponent('h1', 'title').element;
    titleH1.innerHTML = 'RS Lang';
    this.element.append(titleH1);
    new Slider(this.element, this.services).render();
    this.parent.appendChild(this.element);
  };
}
