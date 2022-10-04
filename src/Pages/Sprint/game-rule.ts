import Services from '../../Interfaces/services';
import BaseComponent from '../../Abstract/base-component';
import ButtonWithCallback from '../../Components/button-component';

export default class RuleGame extends BaseComponent {
  private rule?: BaseComponent;

  private btnStart?: ButtonWithCallback;

  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', 'game__rule');
  }

  render = () => {
    this.children = [
      (this.rule = new BaseComponent('h6', 'rule__txt')),
      (this.btnStart = new ButtonWithCallback(
        this.element,
        this.services,
        'rule__btn_start',
        'start',
        'button',
        this.services.sprint.startGameSprint
      )),
    ];
    this.rule.element.insertAdjacentHTML(
      'afterbegin',
      `Вам необходимо выбрать правильный перевод слова.<br> Время игры: 60 секунд.<br> Если Вы зашли в игру с УЧЕБНИКА, в игру включаются слова с открытой страницы (и предыдущих страниц). Таймер будет <span class ="rule__info">ОСТАНОВЛЕН РАНЬШЕ</span>, если изученные Вами слова закончатся.<br> Для управления используйте мышь или клавиши ⇽ ⇾.<br> Готовы? Тогда вперёд! `
    );
    this.btnStart.render();

    this.services.sprint.add('hide-rule-sprint', this.hideRule);
    this.services.sprint.add('show-rule-sprint', this.showRule);
    this.element.prepend(this.rule.element);
    this.parent.appendChild(this.element);
  };

  destroy = () => {
    this.services.sprint.remove('hide-rule-sprint', this.hideRule);
    this.services.sprint.remove('show-rule-sprint', this.showRule);
    super.destroy();
  };

  hideRule = () => {
    this.element.style.display = 'none';
  };

  showRule = () => {
    this.element.style.display = 'block';
  };
}
