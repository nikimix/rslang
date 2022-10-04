import MenuService from '../Service/menu-service';
import RouterService from '../Service/router-service';
import FormService from '../Service/form-service';
import AudioCallService from '../Service/audio-call';
import TextbookService from '../Service/textbook-service';
import SprintService from '../Service/sprint-service';
import LevelSelectionService from '../Service/level-selection';
import StatisticService from '../Service/statistic-service';

export default interface Services {
  menu: MenuService;
  router: RouterService;
  levelSelection: LevelSelectionService;
  form: FormService;
  audioCall: AudioCallService;
  textbook: TextbookService;
  sprint: SprintService;
  statistic: StatisticService;
}
