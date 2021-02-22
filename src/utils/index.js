import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCI3R8iNNbqnfriSPMfgmRpxruqhiYD_RE',
  authDomain: 'pokechallenge-8bccd.firebaseapp.com',
  projectId: 'pokechallenge-8bccd',
  storageBucket: 'pokechallenge-8bccd.appspot.com',
  messagingSenderId: '293885740534',
  appId: '1:293885740534:web:7def85194630dc78b8f3d7',
  measurementId: 'G-NVL959SQHX',
};

export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export default firebase.initializeApp(firebaseConfig);
