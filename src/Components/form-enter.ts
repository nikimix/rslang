import BaseComponent from '../Abstract/base-component';
import Services from '../Interfaces/services';
import { IOptionsInput } from '../Interfaces/common';
import { FormInput } from './form-Input';
import Button from './button';

const inputs: IOptionsInput[] = [
  { title: 'E-mail:', type: 'email', id: 'emall', name: 'emaill' },
  { title: 'Введите пароль:', type: 'password', id: 'password1', name: 'password1' },
];

export default class FormEnter extends BaseComponent<HTMLFormElement> {
  private messageElement?: HTMLElement;

  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('form', 'form');
  }

  render(): void {
    const helloTxt = new BaseComponent('h3', 'form__title').element;
    helloTxt.innerHTML = 'Привет!';
    inputs.forEach((input) => {
      new FormInput(this.element, this.services, input).render();
    });
    new Button(
      this.element,
      this.services,
      'form__btn_enter',
      'Войти',
      'button'
      // this.services.form.clickEnter
    ).render();
    this.messageElement = new BaseComponent('p', 'autorise-error').element;
    this.messageElement.textContent = '';
    const imageHello = new BaseComponent('img', 'form-enter__img_hello').element;
    imageHello.setAttribute('alt', 'smail hello');
    imageHello.setAttribute('src', './assets/img/helloSmail.png');
    this.element.prepend(helloTxt);
    this.element.append(this.messageElement, imageHello);
    this.parent.appendChild(this.element);
    this.services.form.add('show-autorise-error', this.showAutoriseError);
    this.services.form.add('remove-autorise-error', this.removeAutoriseError);
  }

  destroy = () => {
    this.services.form.remove('show-autorise-error', this.showAutoriseError);
    this.services.form.remove('remove-autorise-error', this.removeAutoriseError);
    super.destroy();
  };

  showAutoriseError = () => {
    (this.messageElement as HTMLElement).textContent = this.services.form.btnClickAutorise
      ? 'Такой пользователь уже есть :('
      : 'Такого пользователя нет :(';
    if (!this.services.form.fullEnterInput) (this.messageElement as HTMLElement).textContent = 'Не все поля заполнены';
  };

  removeAutoriseError = () => {
    (this.messageElement as HTMLElement).textContent = '';
  };
}
