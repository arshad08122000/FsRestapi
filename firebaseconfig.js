// Import the functions you need from the SDKs you need
import {initializeApp } from "firebase/app";
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';  
import * as dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
 apiKey: process.env.API_KEY,
 authDomain: process.env.AD,
 projectId: "fbrestapi-40ba9",
 storageBucket: process.env.SB,
 messagingSenderId: process.env.MSI,
 appId: process.env.AI,
 measurementId: process.env.MI
};

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const Db=firebase.firestore();
const User=Db.collection("Users");
export default User;
