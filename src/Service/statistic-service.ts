import Observer from '../Abstract/observer';
import State from '../Model/state';
import defaultStats from '../Settings/default-statistics.json';
import { IGameStats, IStorageStats, IUserStatistic } from '../Interfaces/common';
import { getDate } from '../Helper/utils';
import { getStatistics, setStatistics } from '../Model/api-statistic';
import { Word } from '../Interfaces/word-model';
import { IUserToken } from '../Interfaces/user-model';

export default class StatisticService extends Observer {
  private userId = '';

  private token = '';

  private stats?: IUserStatistic;

  getStats = async (): Promise<IUserStatistic> => {
    const isNewDate = await this.checkDate();
    if (isNewDate && this.stats) {
      const resetStats = this.getResetStats(this.stats);
      return resetStats;
    }
    const stats = await getStatistics(this.userId, this.token);
    return stats;
  };

  updateStats = async () => {
    if (!State.isAutorise) return;
    const isNewDate = await this.checkDate();
    if (isNewDate && this.stats) {
      const resetStats = this.getResetStats(this.stats);
      const updatedStats = this.getUpdatedStats(resetStats);
      await setStatistics(this.userId, this.token, updatedStats);
    } else if (this.stats) {
      const updatedStats = this.getUpdatedStats(this.stats);
      await setStatistics(this.userId, this.token, updatedStats);
    }
  };

  private checkDate = async () => {
    this.setAuthorizationData();
    const currentDate = getDate();
    this.stats = await getStatistics(this.userId, this.token);
    const { date } = this.stats.optional;
    if (date !== currentDate) {
      return true;
    }
    return false;
  };

  private setAuthorizationData = () => {
    const data = localStorage.getItem('userInfoTokken');
    if (data) {
      const userInfo: IUserToken = JSON.parse(data);
      this.userId = userInfo.userId;
      this.token = userInfo.token;
    }
  };

  private getResetStats = (stats: IUserStatistic): IUserStatistic => {
    const resetStats = <IUserStatistic>defaultStats;
    const { oldWords, learnedWords } = resetStats.optional.storage;
    const currentDate = getDate();
    resetStats.optional.date = currentDate;
    oldWords.push(...stats.optional.storage.oldWords);
    learnedWords.push(...stats.optional.storage.learnedWords);
    return resetStats;
  };

  private getUpdatedStats = (stats: IUserStatistic): IUserStatistic => {
    const { nameGame } = State.gamesData;
    const updatedStats = stats;
    const gameStats = this.getUpdateGameStats(stats);
    const storageStats = this.getUpdatedStatsStorage(stats);
    const wordsStats = this.getUpdatedWordsStats(updatedStats);
    updatedStats.optional[nameGame] = gameStats;
    updatedStats.optional.storage = storageStats;
    updatedStats.optional.words = wordsStats;
    return updatedStats;
  };

  private getUpdatedStatsStorage = (stats: IUserStatistic): IStorageStats => {
    const storageStats = stats.optional.storage;
    const newWords = this.getIdNewWords(stats);
    storageStats.oldWords.push(...newWords);
    return storageStats;
  };

  private getUpdateGameStats = (stats: IUserStatistic): IGameStats => {
    const { nameGame, correctAnswers, wrongAnswers, series } = State.gamesData;
    const percent = this.getPercentCorrectAnswers(stats);
    const newWords = this.getIdNewWords(stats);
    const gameStats: IGameStats = stats.optional[nameGame];
    gameStats.correct += correctAnswers.length;
    gameStats.wrong += wrongAnswers.length;
    gameStats.series = series > gameStats.series ? series : gameStats.series;
    gameStats.percent = percent;
    gameStats.newWords += newWords.length;
    return gameStats;
  };

  private getUpdatedWordsStats = (stats: IUserStatistic) => {
    const audioStats = stats.optional.audioCall;
    const sprintStats = stats.optional.sprint;
    const sum = audioStats.correct + audioStats.wrong + sprintStats.correct + sprintStats.wrong;
    const quality = audioStats.correct + sprintStats.correct;
    const wordsStats = stats.optional.words;
    wordsStats.percent = this.getPercents(sum, quality);
    wordsStats.sumNewWords = audioStats.newWords + sprintStats.newWords;
    return wordsStats;
  };

  private getPercents = (total: number, quality: number) => Math.round((100 / total) * quality);

  private getIdNewWords = (stats: IUserStatistic): string[] => {
    const idNewWords: string[] = [];
    const idOldWords = new Set(stats.optional.storage.oldWords);
    const words: Word[] = [...State.gamesData.wrongAnswers, ...State.gamesData.correctAnswers];
    words.forEach((item) => {
      if (!idOldWords.has(item.id)) {
        idNewWords.push(item.id);
      }
    });
    return idNewWords;
  };

  private getPercentCorrectAnswers = (stats: IUserStatistic): number => {
    const { correctAnswers, wrongAnswers, nameGame } = State.gamesData;
    const correctAnswersPerDay = stats.optional[nameGame].correct + correctAnswers.length;
    const wrongAnswersPerDay = stats.optional[nameGame].wrong + wrongAnswers.length;
    const sum = correctAnswersPerDay + wrongAnswersPerDay;
    const result = this.getPercents(sum, correctAnswersPerDay);
    return result;
  };
}
