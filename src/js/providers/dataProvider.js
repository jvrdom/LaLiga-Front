import { fetchUtils } from 'react-admin';
import firebase from '../utils/firebase';

const apiUrl = 'https://reqres.in/api';
const httpClient = fetchUtils.fetchJson;
let data = [];
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
    data.push(element);
  });

  if (pageNo < results.totalPages) {
    return getEntireUserList(pageNo + 1);
  }

  return data;
}

function getList(resource, params) {
  return new Promise((resolve) => {
    const { page, perPage } = params.pagination;
    const start = (page - 1) * perPage;
    const end = page * perPage;

    if (data.length > 0) {
      resolve({ data: data.slice(start, end), total: data.length });
    } else {
      (async () => {
        const entireList = await getEntireUserList(page, perPage);
        resolve({ data: entireList.slice(0, perPage), total: entireList.length });
      })();
    }
  });
}

function create(resource, params) {
  return new Promise((resolve) => {
    const { rawFile } = params.data.files;
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
        paramsToSave.data.id = [...data].pop().id + 1;
        data.push(paramsToSave.data);
        resolve({ data: paramsToSave.data });
      });
  });
}

function getOne(resource, params) {
  return new Promise((resolve) => {
    const user = data.find((userSelected) => userSelected.id === parseInt(params.id, 10));
    resolve({ data: user });
  });
}

function update(resource, params) {
  return new Promise((resolve) => {
    const newState = data.map((obj) => (obj.id === parseInt(params.id, 10) ? { ...obj, ...params.data } : obj));
    data.data = newState;
    resolve({ data: params.data });
  });
}

function deleteElement(resource, params) {
  return new Promise((resolve) => {
    ({ previousData } = params);
    data = data.filter((item) => item.id !== parseInt(params.id, 10));
    resolve({ data: previousData });
  });
}

export default {
  getList,
  create,
  getOne,
  update,
  delete: deleteElement,
};
