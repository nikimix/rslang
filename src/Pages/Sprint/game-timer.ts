import Services from '../../Interfaces/services';
import BaseComponent from '../../Abstract/base-component';

export default class Timer extends BaseComponent {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('h6', 'game-header__timer');
  }

  render = () => {
    this.element.textContent = '60';
    this.parent.appendChild(this.element);
    this.services.sprint.add('start-timer', this.startTimerGame);
    this.services.sprint.add('reset-timer', this.resetTimerGame);
  };

  startTimerGame = () => {
    this.services.sprint.timer(this.element);
  };

  resetTimerGame = () => {
    this.element.innerHTML = '60';
  };

  destroy = () => {
    this.services.sprint.remove('start-timer', this.startTimerGame);
    this.services.sprint.remove('reset-timer', this.resetTimerGame);
    super.destroy();
  };
}
