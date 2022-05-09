import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { firebaseConfig } from "../config/firebase";

const app = initializeApp(firebaseConfig);

getAnalytics(app);