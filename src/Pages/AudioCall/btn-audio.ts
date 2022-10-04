import BaseComponent from '../../Abstract/base-component';
import Services from '../../Interfaces/services';

interface IButtonAudioProps {
  path?: string;
  className: string;
}

export default class ButtonAudio extends BaseComponent<HTMLButtonElement> {
  constructor(
    private readonly parent: HTMLElement,
    private readonly services: Services,
    private props: IButtonAudioProps
  ) {
    super('button', `${props.className} btn btn-audio`);
  }

  render = () => {
    this.services.audioCall.add('play-audio', this.disableButton);
    this.services.audioCall.add('stop-audio', this.activeButton);
    this.element.addEventListener('click', this.playAudio);

    this.parent.appendChild(this.element);
  };

  disableButton = () => {
    this.element.setAttribute('disabled', '');
  };

  activeButton = () => {
    this.element.removeAttribute('disabled');
  };

  playAudio = () => {
    const path = this.props.path ? this.props.path : this.services.audioCall.getWord().audio;
    this.services.audioCall.playAudio(path);
  };

  destroy = () => {
    this.services.audioCall.remove('play-audio', this.disableButton);
    this.services.audioCall.remove('stop-audio', this.activeButton);
    this.element.removeEventListener('click', this.playAudio);

    super.destroy();
  };
}
