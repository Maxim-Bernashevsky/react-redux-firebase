import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDrQK-xe5JOUUQgrab3SRFrdzl-5kGibyA",
    authDomain: "react-places.firebaseapp.com",
    databaseURL: "https://react-places.firebaseio.com",
    projectId: "react-places",
    storageBucket: "react-places.appspot.com"
};

export const fb = firebase
    .initializeApp(config)
    .database()
    .ref();
