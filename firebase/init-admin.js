// import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin";
import serviceAccount from "../config/meteor-firebase-adminsdk.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
  });
}
const db = getFirestore();
export default db;
