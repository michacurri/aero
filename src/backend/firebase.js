
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDubZXODGo07vxhmr73ic7uy6nawuSHoQk",
  authDomain: "aero-workorder-management.firebaseapp.com",
  databaseURL: "https://aero-workorder-management.firebaseio.com",
  projectId: "aero-workorder-management",
  storageBucket: "aero-workorder-management.appspot.com",
  messagingSenderId: "1045580196773",
  appId: "1:1045580196773:web:20f2d1328b7fea3faf164c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase