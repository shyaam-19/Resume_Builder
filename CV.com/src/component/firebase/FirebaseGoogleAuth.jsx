import {initializeApp} from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
// import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAqZvXtHm4Z4lroOfZVTy7jw9wo31TBttw",
    authDomain: "cv-com-2f79b.firebaseapp.com",
    projectId: "cv-com-2f79b",
    storageBucket: "cv-com-2f79b.appspot.com",
    messagingSenderId: "206748507622",
    appId: "1:206748507622:web:7675db0419c250ccacca27",
    measurementId: "G-RJP9J2RTXQ"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

const auth = getAuth();
auth.languageCode = 'it';

const provider = new GoogleAuthProvider();

export {auth,provider};