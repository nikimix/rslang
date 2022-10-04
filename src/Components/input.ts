import BaseComponent from '../Abstract/base-component';
import Services from '../Interfaces/services';

export default class Input extends BaseComponent<HTMLInputElement> {
  constructor(
    private readonly parent: HTMLElement,
    private readonly service: Services,
    private readonly classes: string,
    private readonly id: string,
    private readonly type: string,
    private readonly name: string
  ) {
    super('input', classes);
  }

  render = () => {
    console.log(this.id);
    this.element.setAttribute('type', `${this.type}`);
    this.element.setAttribute('id', `${this.id}`);
    this.element.setAttribute('name', `${this.name}`);
    this.element.setAttribute('autocomplete', `off`);
    this.service.form.add('clear-input', this.clearInput);
    this.parent.appendChild(this.element);
  };

  clearInput = () => {
    (this.element as HTMLInputElement).value = '';
  };
}
