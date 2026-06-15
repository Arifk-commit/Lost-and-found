// Firebase removed - using default image handling
// This file is kept for compatibility but does nothing

export const storage = null;

// If you want to re-enable Firebase later:
// 1. npm install firebase
// 2. Uncomment and configure below:

/*
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_auth_domain",
  projectId: "your_project_id",
  storageBucket: "your_storage_bucket",
  messagingSenderId: "your_messaging_sender_id",
  appId: "your_app_id"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
*/
