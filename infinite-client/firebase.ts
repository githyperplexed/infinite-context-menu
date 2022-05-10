import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { firebaseConfig } from "../config/firebase";

export const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);