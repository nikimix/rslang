import BaseComponent from '../Abstract/base-component';
import Services from '../Interfaces/services';

export default class DarkLayer extends BaseComponent<HTMLDivElement> {
  constructor(private readonly parent: HTMLElement, private readonly service: Services) {
    super('div', 'dark-layer');
  }

  render = () => {
    this.parent.appendChild(this.element);
    this.service.menu.add('show-dark-layer', this.showDarkLayer);
    this.service.menu.add('remove-dark-layer', this.removeDarkLayer);
  };

  destroy = () => {
    this.service.menu.remove('show-dark-layer', this.showDarkLayer);
    this.service.menu.remove('remove-dark-layer', this.removeDarkLayer);
    super.destroy();
  };

  showDarkLayer = () => {
    this.element.style.display = 'block';
  };

  removeDarkLayer = () => {
    this.element.style.display = 'none';
  };
}
