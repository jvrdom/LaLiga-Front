import firebase from '../utils/firebase';

export default {
  login: ({ idProvider }) => {
    firebase.auth().languageCode = 'es';
    let provider = null;

    if (idProvider === 'facebook') {
      provider = new firebase.auth.FacebookAuthProvider();
    } else if (idProvider === 'google') {
      provider = new firebase.auth.GoogleAuthProvider();
    } else if (idProvider === 'twitter') {
      provider = new firebase.auth.TwitterAuthProvider();
    }

    return firebase.auth().signInWithPopup(provider).then((result) => {
      const token = result.credential.accessToken;
      localStorage.setItem('token', token);
      return Promise.resolve();
    }).catch((error) => Promise.reject(error));
  },
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () => (localStorage.getItem('token') ? Promise.resolve() : Promise.reject()),
  getPermissions: () => Promise.resolve(),
};
