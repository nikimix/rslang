import { UserWord, Word } from '../Interfaces/word-model';
import { IUserToken } from '../Interfaces/user-model';

export const baseUrl = 'https://rs-learn-words.herokuapp.com/';

export const getWords = async (page = 0, group = 0): Promise<Response> => {
  let pageValidate = page;
  let groupValidate = group;

  if (Number.isNaN(group)) {
    groupValidate = 0;
  }
  if (Number.isNaN(page)) {
    pageValidate = 0;
  }
  const response = fetch(`${baseUrl}words?page=${pageValidate}&group=${groupValidate}`);
  return response;
};

export const getWord = async (id: string): Promise<Word> => {
  const word = fetch(`${baseUrl}words/${id}`).then((res) => res.json()) as Promise<Word>;
  return word;
};

export const getUsersWords = async () => {
  const user = localStorage.getItem('userInfoTokken');
  let userId = '';
  let token = '';
  if (user) userId = (JSON.parse(user) as IUserToken).userId;
  if (user) token = (JSON.parse(user) as IUserToken).token;
  const response = fetch(`${baseUrl}users/${userId}/words`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  }).then((res) => res.json()) as Promise<UserWord[]>;
  return response;
};

const updateUserWord = async (wordId: string, word: UserWord) => {
  const user = localStorage.getItem('userInfoTokken');
  let userId = '';
  let token = '';

  if (user) userId = (JSON.parse(user) as IUserToken).userId;
  if (user) token = (JSON.parse(user) as IUserToken).token;

  const response = fetch(`${baseUrl}users/${userId}/words/${wordId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  }).then((res) => res.json());

  return response;
};

const createUserWord = async (wordId: string, word: UserWord) => {
  const user = localStorage.getItem('userInfoTokken');
  let userId = '';
  let token = '';

  if (user) userId = (JSON.parse(user) as IUserToken).userId;
  if (user) token = (JSON.parse(user) as IUserToken).token;

  const response = fetch(`${baseUrl}users/${userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  }).then((res) => {
    if (res.status === 417) {
      return updateUserWord(wordId, word);
    }
    return res.json();
  });

  return response;
};

export const createDifficultUserWord = async (wordId: string, isExist = false) => {
  const word = (await getWord(wordId)) as Word;
  const userWord: UserWord = { difficulty: 'hard', optional: { word } };

  if (isExist) return updateUserWord(wordId, userWord);

  const res = await createUserWord(wordId, userWord);

  return res;
};

export const createEasyUserWord = async (wordId: string, isExist = false) => {
  const word = (await getWord(wordId)) as Word;
  const userWord: UserWord = { difficulty: 'weak', optional: { word } };

  if (isExist) return updateUserWord(wordId, userWord);

  const res = await createUserWord(wordId, userWord);
  return res;
};

export const deleteUserWord = async (wordId: string) => {
  const user = localStorage.getItem('userInfoTokken');
  let userId = '';
  let token = '';

  if (user) userId = (JSON.parse(user) as IUserToken).userId;
  if (user) token = (JSON.parse(user) as IUserToken).token;

  fetch(`${baseUrl}users/${userId}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (res.status !== 204) console.log(res.statusText);
  });
};
