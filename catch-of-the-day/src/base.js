import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD6aRt9OITmf7eEUVkbr2rVIsUR7HBYwVo",
  authDomain: "catch-of-the-day-dswebs.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-dswebs.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
