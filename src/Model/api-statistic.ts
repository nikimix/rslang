import { IUserStatistic } from '../Interfaces/common';

const base = 'https://rs-learn-words.herokuapp.com/';

export const setStatistics = async (
  userId: string,
  userToken: string,
  userStatistic: IUserStatistic
): Promise<IUserStatistic> => {
  const response: Response = await fetch(`${base}users/${userId}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userStatistic),
  });
  const content = await response.json();
  return content;
};

export const getStatistics = async (userId: string, userToken: string): Promise<IUserStatistic> => {
  const response: Response = await fetch(`${base}users/${userId}/statistics`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const statistics = await response.json();
  delete statistics.id;
  return statistics;
};
