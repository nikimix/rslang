import BaseComponent from '../../Abstract/base-component';
import Services from '../../Interfaces/services';
import ButtonSelect from './button-answer';

export default class Answers extends BaseComponent {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', 'answers-container');
  }

  render = () => {
    this.services.audioCall.add('next-word', this.updateContainer);

    this.addTranslateOptions();
    this.parent.appendChild(this.element);
  };

  addTranslateOptions = () => {
    const translateOptions: string[] = this.services.audioCall.getTranslateOptions();
    translateOptions.forEach((item, idx) => {
      this.children.push(new ButtonSelect(this.element, this.services, [item, `${idx + 1}`]));
      this.children[idx].render();
    });
  };

  updateContainer = () => {
    this.children.forEach((child) => child.destroy());
    this.children = [];
    this.addTranslateOptions();
  };

  destroy = () => {
    this.services.audioCall.remove('next-word', this.updateContainer);
    super.destroy();
  };
}
