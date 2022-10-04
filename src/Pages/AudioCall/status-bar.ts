import BaseComponent from '../../Abstract/base-component';
import Services from '../../Interfaces/services';
import State from '../../Model/state';

export default class StatusBar extends BaseComponent {
  private total?: BaseComponent;

  private current?: BaseComponent;

  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('p', 'audio-call-header__status-bar status-bar');
  }

  render = () => {
    this.services.audioCall.add('next-word', this.updateCurrentStatus);

    this.children = [
      (this.current = new BaseComponent('span', 'status-bar__current')),
      (this.total = new BaseComponent('span', 'status-bar__current')),
    ];

    this.current.element.textContent = '1/';

    this.total.element.textContent = `${State.words.length}`;

    this.element.appendChild(this.current.element);
    this.element.appendChild(this.total.element);

    this.parent.appendChild(this.element);
  };

  updateCurrentStatus = () => {
    if (this.current) {
      const currentState = this.services.audioCall.counter;
      this.current.element.textContent = `${currentState}/`;
    }
  };

  destroy = () => {
    this.services.audioCall.remove('next-word', this.updateCurrentStatus);
    super.destroy();
  };
}
