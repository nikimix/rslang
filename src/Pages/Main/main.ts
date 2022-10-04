import BaseComponent from '../../Abstract/base-component';
import Services from '../../Interfaces/services';
import LeftContainerMain from './left-container-main';
import RightContainerMain from './right-container-main';

export default class Main extends BaseComponent {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('section', 'main-pages');
  }

  render = () => {
    new LeftContainerMain(this.element, this.services).render();
    new RightContainerMain(this.element, this.services).render();
    this.parent.appendChild(this.element);
  };
}
