import Services from '../Interfaces/services';
import BaseComponent from '../Abstract/base-component';
import State from '../Model/state';

const levels: string[] = ['Уровень 1', 'Уровень 2', 'Уровень 3', 'Уровень 4', 'Уровень 5', 'Уровень 6'];

export default class TextBookSettings extends BaseComponent {
  nextBtn: HTMLLinkElement;

  prevBtn: HTMLLinkElement;

  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', 'textbook__settings settings');
    this.nextBtn = new BaseComponent('a', 'settings__next').element as HTMLLinkElement;
    this.prevBtn = new BaseComponent('a', 'settings__prev').element as HTMLLinkElement;
  }

  render() {
    const path = document.location.hash.toLowerCase();
    const page = path.slice(path.indexOf('page') + 5, path.indexOf('&'));
    const group = path.slice(path.indexOf('group') + 6);
    if (Number.isNaN(Number(page)) || Number(page) <= 0) {
      State.textbook.currentPage = 0;
    } else if (Number(page) > 29) {
      State.textbook.currentPage = 29;
    } else {
      State.textbook.currentPage = Number(page);
    }

    if (Number.isNaN(Number(group)) || Number(group) <= 0) {
      State.textbook.currentLevel = 0;
    } else if (Number(group) > 5) {
      State.textbook.currentLevel = 5;
    } else {
      State.textbook.currentLevel = Number(group);
    }
    const levelSelector = new BaseComponent('select', 'settings__level level').element as HTMLSelectElement;
    levels.forEach((stage) => {
      const level = new BaseComponent('option', 'level__item').element as HTMLOptionElement;
      level.textContent = stage;
      levelSelector.append(level);
    });
    levelSelector.value = `Уровень ${State.textbook.currentLevel + 1}`;
    const navigation = new BaseComponent('div', 'settings__nav').element as HTMLDivElement;
    const { prevBtn } = this;
    prevBtn.textContent = '<';
    prevBtn.href = `#/book?page=${State.textbook.currentPage}&group=${State.textbook.currentLevel}`;
    const { nextBtn } = this;
    nextBtn.textContent = '>';
    nextBtn.href = `#/book?page=${State.textbook.currentPage}&group=${State.textbook.currentLevel}`;
    const currentPage = new BaseComponent('span', 'settings__page').element;
    currentPage.textContent = `${State.textbook.currentPage + 1}`;
    navigation.append(prevBtn, currentPage, nextBtn);
    const sprintLink = new BaseComponent('a', 'settings__link').element as HTMLLinkElement;
    sprintLink.textContent = 'Спринт';
    sprintLink.href = '#/sprint';
    sprintLink.addEventListener('click', () => {
      State.textbook.fromTextbook = true;
    });
    const audioCallLink = new BaseComponent('a', 'settings__link').element as HTMLLinkElement;
    audioCallLink.textContent = 'Аудиовызов';
    audioCallLink.href = '#/audio-call';
    this.element.append(levelSelector, navigation, audioCallLink, sprintLink);
    this.parent.appendChild(this.element);
    levelSelector.addEventListener('change', () => {
      const levelNumber = Number(levelSelector.value.slice(-1)) - 1;
      window.location.href = `#/book?page=${0}&group=${levelNumber}`;
    });

    if (localStorage.getItem('userInfoTokken')) {
      const vocabularyLink = new BaseComponent('a', 'settings__link').element as HTMLLinkElement;
      vocabularyLink.textContent = 'Сложные слова';
      vocabularyLink.href = '#/vocabulary';
      this.element.append(vocabularyLink);
    }
  }

  setLinks() {
    setTimeout(() => {
      this.nextBtn.href =
        State.textbook.currentPage >= 29
          ? `#/book?page=${29}&group=${State.textbook.currentLevel}`
          : `#/book?page=${State.textbook.currentPage + 1}&group=${State.textbook.currentLevel}`;

      this.prevBtn.href =
        State.textbook.currentPage <= 0
          ? `#/book?page=${0}&group=${State.textbook.currentLevel}`
          : `#/book?page=${State.textbook.currentPage - 1}&group=${State.textbook.currentLevel}`;
    }, 300);
  }
}
