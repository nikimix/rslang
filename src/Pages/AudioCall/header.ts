import BaseComponent from '../../Abstract/base-component';
import Services from '../../Interfaces/services';
import StatusBar from './status-bar';

export default class AudioCallHeader extends BaseComponent {
  btnFullscreen?: BaseComponent;

  statusBar?: StatusBar;

  btnExit?: BaseComponent;

  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', 'audio-call-header');
  }

  render = () => {
    this.children = [
      (this.btnFullscreen = new BaseComponent<HTMLButtonElement>('button', 'audio-call-header__btn-fullscreen btn')),
      (this.statusBar = new StatusBar(this.element, this.services)),
      (this.btnExit = new BaseComponent<HTMLButtonElement>('button', 'audio-call-header__btn-exit btn')),
    ];

    this.btnFullscreen?.element.addEventListener('click', this.services.audioCall.switchScreenMode);

    this.element.prepend(this.btnFullscreen.element);

    this.statusBar.render();

    this.btnExit.element.addEventListener('click', () => {
      this.services.audioCall.exitGame();
      document.location.hash = '#/main';
    });

    this.element.appendChild(this.btnExit.element);

    this.parent.appendChild(this.element);
  };

  destroy = () => {
    this.btnFullscreen?.element.removeEventListener('click', this.services.audioCall.switchScreenMode);
    super.destroy();
  };
}
