import MainPage from '../Pages/Main/page-main';
import TeamPage from '../Pages/AboutTeam/page';
import AudioCall from '../Pages/AudioCall/page';
import LevelSelection from '../Pages/LevelSelection/page';
import TextbookPage from '../Pages/Textbook/textbook';
import Services from '../Interfaces/services';
import SprintPage from '../Pages/Sprint/page-sprint';
import StatisticPage from '../Pages/Statistic/page-statistic';
import StatisticInfoPage from '../Pages/Statistic/page-statistic-Info';
import VocabularyPage from '../Pages/Vocabulary/vocabulary';
import State from '../Model/state';

type Page =
  | MainPage
  | TeamPage
  | TextbookPage
  | AudioCall
  | LevelSelection
  | SprintPage
  | StatisticPage
  | StatisticInfoPage
  | VocabularyPage;

interface RoutesInterface {
  path: string;
  component: Page;
}

export default class Router {
  private readonly routes: RoutesInterface[];

  constructor(private readonly root: HTMLElement, private readonly services: Services) {
    this.routes = [
      { path: '#/main', component: new MainPage(this.root, this.services) },
      { path: '#/authors', component: new TeamPage(this.root, this.services) },
      { path: '#/level-selection', component: new LevelSelection(this.root, this.services) },
      { path: '#/audio-call', component: new AudioCall(this.root, this.services) },
      { path: '#/sprint', component: new SprintPage(this.root, this.services) },
      { path: '#/vocabulary', component: new VocabularyPage(this.root, this.services) },
      { path: '#/book', component: new TextbookPage(this.root, this.services) },
      { path: '#/statistic', component: new StatisticPage(this.root, this.services) },
      { path: '#/statisticInfo', component: new StatisticInfoPage(this.root, this.services) },
    ];
  }

  render = (): void => {
    window.addEventListener('hashchange', this.routing);
    window.addEventListener('load', this.routing);
  };

  routing = (): void => {
    const path = document.location.hash.toLowerCase() || '#/main';
    this.services.router.setRouter(path);
    if (path.includes('#/book')) {
      const currentRout = this.routes.find((item) => item.path === '#/book') || this.routes[0];
      currentRout.component.render();
      return;
    }
    if (path.includes('statistic') && localStorage.getItem('userInfoTokken')) {
      const currentRout = this.routes.find((item) => item.path === '#/statisticInfo') || this.routes[0];
      currentRout.component.render();
      return;
    }
    if (path.includes('level-selection')) State.textbook.fromTextbook = false;
    const currentRout = this.routes.find((item) => item.path === path) || this.routes[0];
    currentRout.component.render();
  };
}
