import BaseComponent from '../Abstract/base-component';
import Services from '../Interfaces/services';
import ButtonAutorise from './button-autorise';

export default class ContainerCoiceAutorise extends BaseComponent {
  private btnOpenAutorise?: ButtonAutorise;

  private btnOpenEnter?: ButtonAutorise;

  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', 'header__container_coice-autorise');
  }

  render = () => {
    this.children = [
      (this.btnOpenAutorise = new ButtonAutorise(
        this.element,
        this.services,
        'header__btn_openAutorise',
        'Autorise',
        'button',
        this.services.form.openAutoriseForm
      )),
      (this.btnOpenEnter = new ButtonAutorise(
        this.element,
        this.services,
        'header__btn_openEnter',
        'Enter',
        'button',
        this.services.form.openEnterForm
      )),
    ];
    this.btnOpenAutorise.render();
    this.btnOpenEnter.render();
    this.parent.appendChild(this.element);
    this.services.form.add('show-container-autorise', this.showContainerAutorise);
    this.services.form.add('hide-container-autorise', this.hideContainerAutorise);
  };

  destroy = () => {
    this.services.form.remove('show-container-autorise', this.showContainerAutorise);
    this.services.form.remove('hide-container-autorise', this.hideContainerAutorise);
    super.destroy();
  };

  showContainerAutorise = () => {
    this.element.style.display = 'flex';
  };

  hideContainerAutorise = () => {
    this.element.style.display = 'none';
  };
}
