import Services from '../../Interfaces/services';
import BaseComponent from '../../Abstract/base-component';

export default class AudioBtnGameSprint extends BaseComponent<HTMLButtonElement> {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('button', 'game__audio');
  }

  render = () => {
    this.element.addEventListener('click', this.services.sprint.playAudioWord);
    this.parent.appendChild(this.element);
  };

  destroy = () => {
    this.element.removeEventListener('click', this.services.sprint.playAudioWord);
    super.destroy();
  };
}
