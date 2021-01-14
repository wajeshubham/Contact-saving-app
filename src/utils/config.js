export var firebaseConfig = {
  // add your firebase project configuration here
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_M_ID,
};

//image configuration
export const imageConfig = {
  quality: 0.2,
  maxWidth: 800,
  maxHeight: 600,
  autoRotate: true,
};
