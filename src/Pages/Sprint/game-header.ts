import Services from '../../Interfaces/services';
import BaseComponent from '../../Abstract/base-component';
import Timer from './game-timer';
import ButtonWithCallback from '../../Components/button-component';

export default class HeaderGame extends BaseComponent {
  private count?: BaseComponent;

  private countAdd?: BaseComponent;

  private timer?: Timer;

  private btnRepeat?: ButtonWithCallback;

  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', 'game__header');
  }

  render = () => {
    this.children = [
      (this.count = new BaseComponent('h6', 'game-header__count')),
      (this.countAdd = new BaseComponent('p', 'game-header__count-add')),
      (this.timer = new Timer(this.element, this.services)),
      (this.btnRepeat = new ButtonWithCallback(
        this.element,
        this.services,
        'game-header__btn-repeat',
        '',
        'button',
        this.services.sprint.repeatGame
      )),
    ];
    this.count.element.innerHTML = '0';
    this.countAdd.element.innerHTML = '+10';
    this.timer.render();
    this.btnRepeat.render();

    this.element.append(this.countAdd.element, this.count.element);
    this.parent.appendChild(this.element);

    this.services.sprint.add('reset-count-game', this.resetCount);
    this.services.sprint.add('add-count-game', this.addCount);
    this.services.sprint.add('add-count-game-reset', this.addCountReset);
    this.services.sprint.add('correct-add-count', this.correctAddCount);
  };

  destroy = () => {
    this.services.sprint.remove('reset-count-game', this.resetCount);
    this.services.sprint.remove('add-count-game', this.addCount);
    this.services.sprint.remove('add-count-game-reset', this.addCountReset);
    this.services.sprint.remove('correct-add-count', this.correctAddCount);
    super.destroy();
  };

  resetCount = () => {
    this.element.children[3].innerHTML = '0';
    this.element.children[2].innerHTML = '+10';
  };

  addCountReset = () => {
    this.element.children[2].innerHTML = '+10';
  };

  correctAddCount = () => {
    if (this.services.sprint.countTrueAnsve >= 3 && this.services.sprint.countTrueAnsve <= 6) {
      this.element.children[2].innerHTML = '+20';
    }
    if (this.services.sprint.countTrueAnsve >= 6) {
      this.element.children[2].innerHTML = '+30';
    }
    if (this.services.sprint.countTrueAnsve < 3) {
      this.element.children[2].innerHTML = '+10';
    }
  };

  addCount = () => {
    const count = +(this.element.children[3].textContent as string);
    if (this.services.sprint.countTrueAnsve > 3 && this.services.sprint.countTrueAnsve <= 6) {
      this.element.children[3].innerHTML = `${count + 20}`;
      this.services.sprint.userResult += 20;
    }
    if (this.services.sprint.countTrueAnsve > 6) {
      this.element.children[3].innerHTML = `${count + 30}`;
      this.services.sprint.userResult += 30;
    }
    if (this.services.sprint.countTrueAnsve <= 3) {
      this.element.children[3].innerHTML = `${count + 10}`;
      this.services.sprint.userResult += 10;
    }
  };
}
