import BaseComponent from '../../Abstract/base-component';
import Services from '../../Interfaces/services';

export default class ButtonSelect extends BaseComponent<HTMLButtonElement> {
  private translate = '';

  private number = '';

  constructor(private readonly parent: HTMLElement, private readonly services: Services, private props: string[]) {
    super('button', 'btn-select btn');
    [this.translate, this.number] = props;
  }

  render = () => {
    this.element.addEventListener('click', this.selectAnswer);
    this.services.audioCall.add('show-answer', this.changeState);
    document.addEventListener('keydown', this.selectAnswer);

    this.element.textContent = `${this.number}: ${this.translate}`;
    this.parent.appendChild(this.element);
  };

  selectAnswer = (evt: MouseEvent | KeyboardEvent) => {
    if (evt instanceof KeyboardEvent && evt.code === `Digit${this.number}`) {
      evt.preventDefault();
      this.services.audioCall.checkAnswer(this.translate);
    }
    if (evt instanceof MouseEvent) {
      this.services.audioCall.checkAnswer(this.translate);
    }
  };

  changeState = (...data: string[]) => {
    const [correctAnswer, wrongAnswer] = data;
    if (this.translate === correctAnswer) {
      this.element.classList.add('btn-select--correct');
    } else if (this.translate === wrongAnswer) {
      this.element.classList.add('btn-select--wrong');
    }
    this.element.removeEventListener('click', this.selectAnswer);
    document.removeEventListener('keydown', this.selectAnswer);
  };

  destroy = () => {
    this.element.removeEventListener('click', this.selectAnswer);
    this.services.audioCall.remove('show-answer', this.changeState);
    document.removeEventListener('keydown', this.selectAnswer);

    super.destroy();
  };
}
