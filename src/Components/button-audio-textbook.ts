import BaseComponent from '../Abstract/base-component';
import { baseUrl } from '../Model/getTextbook';
import State from '../Model/state';
import Services from '../Interfaces/services';

export default class ButtonAudioTextbook extends BaseComponent<HTMLButtonElement> {
  private audio: HTMLAudioElement;

  private audioMeaning: HTMLAudioElement;

  private audioExample: HTMLAudioElement;

  private isPlayed: boolean;

  removeListeners: () => void;

  constructor(
    private readonly parent: HTMLElement,
    private readonly service: Services,
    private readonly src: string[],
    private readonly id: string
  ) {
    super('div', 'cart__audio');
    this.audio = new Audio(baseUrl + this.src[0]);
    this.audioExample = new Audio(baseUrl + this.src[1]);
    this.audioMeaning = new Audio(baseUrl + this.src[2]);
    this.isPlayed = false;
    this.removeListeners = () => {};
  }

  render = () => {
    const playStopFunc = () => {
      if (State.textbook.isPlayed && this.element.classList.contains('cart__audio--play')) {
        this.stop();
      } else {
        this.start();
      }
    };

    const onAudioEnd = () => {
      this.audioMeaning.play();
    };

    const onAudioMeaningEnd = () => {
      this.audioExample.play();
    };
    const onAudioExampleEnd = () => {
      this.stop();
    };

    this.removeListeners = () => {
      this.element.removeEventListener('click', playStopFunc);
      this.audio.removeEventListener('ended', onAudioEnd);
      this.audioMeaning.removeEventListener('ended', onAudioMeaningEnd);
      this.audioExample.removeEventListener('ended', onAudioExampleEnd);
    };

    this.element.addEventListener('click', playStopFunc);

    this.element.append(this.audio, this.audioMeaning, this.audioExample);
    this.parent.appendChild(this.element);

    this.audio.addEventListener('ended', onAudioEnd);
    this.audioMeaning.addEventListener('ended', onAudioMeaningEnd);
    this.audioExample.addEventListener('ended', onAudioExampleEnd);
  };

  private stop() {
    const audioItems = document.querySelectorAll('audio');
    audioItems?.forEach((audio) => {
      audio.pause();
      const item = audio;
      item.currentTime = 0;
    });
    document.querySelectorAll('.cart__audio')?.forEach((block) => {
      block.classList.remove('cart__audio--play');
    });
    State.textbook.isPlayed = false;
  }

  private start() {
    if (State.textbook.isPlayed) this.stop();
    State.textbook.isPlayed = true;
    this.element.classList.add('cart__audio--play');
    this.audio.play();
  }

  destroy(): void {
    this.removeListeners();
    super.destroy();
  }
}
