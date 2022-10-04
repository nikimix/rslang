import Services from '../../Interfaces/services';
import BaseComponent from '../../Abstract/base-component';
import State from '../../Model/state';

export default class StatisticBook extends BaseComponent {
  private bookTitle?: BaseComponent;

  private containerTitle?: BaseComponent;

  private containerItem?: BaseComponent;

  private bookImage?: BaseComponent;

  private newWords?: BaseComponent;

  private countTrueFalse?: BaseComponent;

  private chain?: BaseComponent;

  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', 'statistic-book');
  }

  render = () => {
    this.services.statistic.add('write-statistic', this.writeStatistic);
    this.children = [
      (this.containerTitle = new BaseComponent('div', 'book__result-title')),
      (this.containerItem = new BaseComponent('div', 'book__result-item')),
      (this.bookTitle = new BaseComponent('h6', 'book__title')),
      (this.bookImage = new BaseComponent('img', 'book__img')),
      (this.newWords = new BaseComponent('h6', 'book__new-words item-statistic')),
      (this.countTrueFalse = new BaseComponent('h6', 'book__true-false item-statistic')),
      (this.chain = new BaseComponent('h6', 'book__chain item-statistic')),
    ];
    this.containerTitle.element.append(this.bookTitle.element, this.bookImage.element);
    this.containerItem.element.append(this.newWords.element, this.countTrueFalse.element, this.chain.element);

    this.bookTitle.element.innerHTML = 'Учебник';
    this.newWords.element.innerHTML = 'Новые слова: 0';
    this.countTrueFalse.element.innerHTML = 'Изученные слова за день: 0';
    this.chain.element.innerHTML = 'Процент правильных ответов: 0%';

    this.bookImage.element.setAttribute('src', './assets/img/book.png');
    this.bookImage.element.setAttribute('alt', 'img book logo');

    this.element.prepend(this.containerTitle.element, this.containerItem.element);
    this.writeStatistic();
    this.parent.appendChild(this.element);
  };

  writeStatistic = () => {
    const { sumNewWords, percent } = State.statistics.optional.words;
    console.log(sumNewWords, percent);
    this.element.children[1].children[0].innerHTML = `Новые слова:  ${sumNewWords}`;
    this.element.children[1].children[1].innerHTML = `Верных ответов:  ${percent} %`;
    this.element.children[1].children[2].innerHTML = `Изученные слова:  ${percent}`;
  };

  destroy = () => {
    this.services.statistic.remove('write-statistic', this.writeStatistic);
    super.destroy();
  };
}
