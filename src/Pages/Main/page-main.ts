import Services from '../../Interfaces/services';
import Main from './main';

export default class MainPage {
  constructor(private parent: HTMLElement, private services: Services) {}

  render = () => {
    this.parent.innerHTML = '';
    new Main(this.parent, this.services).render();
  };
}
