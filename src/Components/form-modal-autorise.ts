import BaseComponent from '../Abstract/base-component';
import Services from '../Interfaces/services';
import ButtonWithCallback from './button-component';
import FormAutorise from './form-autorise';

export default class AutoriseFormModal extends BaseComponent<HTMLDivElement> {
  private btnCloseAutorise?: ButtonWithCallback;

  private formAutorise?: FormAutorise;

  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', 'form-container');
  }

  render(): void {
    this.children = [
      (this.btnCloseAutorise = new ButtonWithCallback(
        this.element,
        this.services,
        'header__btn_closeAutorise',
        'X',
        'button',
        this.services.form.closeAutoriseForm
      )),
      (this.formAutorise = new FormAutorise(this.element, this.services)),
    ];
    this.btnCloseAutorise.render();
    this.formAutorise.render();

    this.services.form.add('close-autorise-form', this.closeAutoriseForm);
    this.services.form.add('open-autorise-form', this.openAutoriseForm);
    this.parent.appendChild(this.element);
  }

  destroy = () => {
    this.services.form.remove('close-autorise-form', this.closeAutoriseForm);
    this.services.form.remove('open-autorise-form', this.openAutoriseForm);
    super.destroy();
  };

  openAutoriseForm = () => {
    this.services.menu.showDarkLayer();
    this.services.form.clearInput();
    this.services.form.unDisabledBtnAutorise();
    this.element.style.display = 'block';
    this.services.form.removeAutoriseError();
    this.services.form.fullAllInput = false;
    this.services.form.fullEnterInput = false;
  };

  closeAutoriseForm = () => {
    this.services.menu.removeDarkLayer();
    this.element.style.display = 'none';
  };
}
