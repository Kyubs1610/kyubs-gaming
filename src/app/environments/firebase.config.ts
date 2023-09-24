import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';


const firebaseConfig  = {
    apiKey: "AIzaSyDb7HWV7HMY99BBEKBBibZGGHc-efZE3Ac",
    authDomain: "kyubs-gaming.firebaseapp.com",
    projectId: "kyubs-gaming",
    storageBucket: "kyubs-gaming.appspot.com",
    messagingSenderId: "300037449012",
    appId: "1:300037449012:web:719d880cdb8ecd63fc3161",
    measurementId: "G-0WGJGZ28JC"
    
};

const app = initializeApp(firebaseConfig );
export const db = getFirestore(app);
export { firebaseConfig };