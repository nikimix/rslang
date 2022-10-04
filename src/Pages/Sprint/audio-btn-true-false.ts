import Services from '../../Interfaces/services';
import BaseComponent from '../../Abstract/base-component';

export default class AudioTrueFalseBtn extends BaseComponent<HTMLButtonElement> {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('button', 'spint__btn_audio-true-false');
  }

  render = () => {
    this.element.addEventListener('click', this.services.sprint.disabledBtnAudioError);
    this.services.sprint.add('disabled-audio-error', this.disabledAudioError);
    this.parent.appendChild(this.element);
  };

  disabledAudioError = () => {
    this.element.classList.toggle('disabled-error');
    this.services.sprint.stopAudioError = !this.services.sprint.stopAudioError;
  };

  destroy = () => {
    this.services.sprint.remove('disabled-audio-error', this.disabledAudioError);
    this.element.removeEventListener('click', this.services.sprint.disabledBtnAudioError);
    super.destroy();
  };
}
