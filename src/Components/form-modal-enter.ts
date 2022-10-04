import BaseComponent from '../Abstract/base-component';
import Services from '../Interfaces/services';
import ButtonWithCallback from './button-component';
import FormEnter from './form-enter';

export default class EnterFormModal extends BaseComponent<HTMLDivElement> {
  private closeAutorise?: ButtonWithCallback;

  private formEnter?: FormEnter;

  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', 'form-container');
  }

  render(): void {
    this.children = [
      (this.closeAutorise = new ButtonWithCallback(
        this.element,
        this.services,
        'header__btn_closeAutorise',
        'X',
        'button',
        this.services.form.closeEnterForm
      )),
      (this.formEnter = new FormEnter(this.element, this.services)),
    ];
    this.closeAutorise.render();
    this.formEnter.render();
    this.services.form.add('close-enter-form', this.closeEnterForm);
    this.services.form.add('open-enter-form', this.openEnterForm);
    this.parent.appendChild(this.element);
  }

  destroy = () => {
    this.services.form.remove('close-enter-form', this.closeEnterForm);
    this.services.form.remove('open-enter-form', this.openEnterForm);
    super.destroy();
  };

  openEnterForm = () => {
    this.services.menu.showDarkLayer();
    this.services.form.clearInput();
    this.services.form.unDisabledBtnAutorise();
    this.element.style.display = 'block';
    this.services.form.removeAutoriseError();
    this.services.form.fullAllInput = false;
    this.services.form.fullEnterInput = false;
  };

  closeEnterForm = () => {
    this.services.menu.removeDarkLayer();
    this.element.style.display = 'none';
  };
}
