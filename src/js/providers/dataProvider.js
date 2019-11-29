import { fetchUtils } from 'react-admin';
import firebase from '../utils/firebase';

const apiUrl = 'https://reqres.in/api';
const httpClient = fetchUtils.fetchJson;
let users = [];
let previousData = null;

async function getUsers(page = 1, perPage = 5, resource = 'users') {
  const url = `${apiUrl}/${resource}?page=${page}&per_page=${perPage}`;
  const apiResults = await httpClient(url).then(({ json }) => ({
    data: json.data,
    total: parseInt(json.total, 10),
    totalPages: json.total_pages,
  })).then((resp) => resp);

  return apiResults;
}

async function getEntireUserList(pageNo, perPage) {
  const results = await getUsers(pageNo, perPage);
  results.data.forEach((element) => {
    users.push(element);
  });

  if (pageNo < results.totalPages) {
    return getEntireUserList(pageNo + 1);
  }

  return users;
}

async function getList(resource, params) {
  const { page, perPage } = params.pagination;
  const start = (page - 1) * perPage;
  const end = page * perPage;

  if (users.length === 0) {
    await getEntireUserList(page, perPage);
  }

  return new Promise((resolve) => {
    resolve({ data: users.slice(start, end), total: users.length });
  });
}

function create(resource, params) {
  return new Promise((resolve) => {
    const { rawFile } = params.data.avatar;
    const refStorage = firebase.storage().ref();
    const fileName = `${new Date()}-${rawFile.title}`;
    const metadata = { contentType: rawFile.type };
    const paramsToSave = params;
    refStorage
      .child(fileName)
      .put(rawFile, metadata)
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => {
        paramsToSave.data.avatar = url;
        paramsToSave.data.id = [...users].pop().id + 1;
        users.push(paramsToSave.data);
        resolve({ data: paramsToSave.data });
      });
  });
}

function getOne(resource, params) {
  return new Promise((resolve) => {
    const user = users.find((userSelected) => userSelected.id === parseInt(params.id, 10));
    resolve({ data: user });
  });
}

function update(resource, params) {
  return new Promise((resolve) => {
    const newState = users.map((obj) => (obj.id === parseInt(params.id, 10) ? { ...obj, ...params.data } : obj));
    users = newState;
    resolve({ data: params.data });
  });
}

function deleteUser(resource, params) {
  return new Promise((resolve) => {
    ({ previousData } = params);
    users = users.filter((item) => item.id !== parseInt(params.id, 10));
    resolve({ data: previousData });
  });
}

export default {
  getList,
  create,
  getOne,
  update,
  delete: deleteUser,
};
