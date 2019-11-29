import firebase from '../utils/firebase';

const HTTP_CODES = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
};

function login({ idProvider }) {
  firebase.auth().languageCode = 'es';
  let provider = null;

  if (idProvider === 'facebook') {
    provider = new firebase.auth.FacebookAuthProvider();
  } else if (idProvider === 'google') {
    provider = new firebase.auth.GoogleAuthProvider();
  } else if (idProvider === 'twitter') {
    provider = new firebase.auth.TwitterAuthProvider();
  } else {
    return Promise.reject(new Error('No provider provided'));
  }

  return firebase.auth().signInWithPopup(provider).then((result) => {
    const token = result.credential.accessToken;
    localStorage.setItem('token', token);

    const userData = {
      name: result.user.displayName,
      email: result.user.email || result.additionalUserInfo.profile.email,
      provider: result.additionalUserInfo.providerId,
    }

    if (idProvider === 'facebook') {
      userData.avatar = `${result.user.photoURL}?width=151&height=150`;
    } else if (idProvider === 'twitter') {
      userData.avatar = result.user.photoURL.replace('_normal', '');
    } else {
      userData.avatar = result.user.photoURL;
    }

    localStorage.setItem('user', JSON.stringify(userData));

    return Promise.resolve();
  }).catch((error) => Promise.reject(error));
}

function logout() {
  localStorage.removeItem('token');
  return Promise.resolve();
}

function checkError({ status }) {
  if (status === HTTP_CODES.UNAUTHORIZED || status === HTTP_CODES.FORBIDDEN) {
    localStorage.removeItem('token');
    return Promise.reject();
  }
  return Promise.resolve();
}

function checkAuth() {
  return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
}

function getPermissions() {
  return Promise.resolve();
}

export default {
  login,
  logout,
  checkError,
  checkAuth,
  getPermissions,
};
