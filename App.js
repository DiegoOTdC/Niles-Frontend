import * as React from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import { YellowBox } from "react-native";
import * as firebase from "firebase";
import StackNavigator from "./src/navigation/StackNavigator";

import {
  apiKey,
  authDomain,
  databaseUrl,
  projectId,
  storageBucket,
  messagingSenderId,
} from "@env";

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  databaseUrl: databaseUrl,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  //This warning is not causing any problems and as far as I know we can't do anything about it. Created by using firebase.
  YellowBox.ignoreWarnings(["Setting a timer"]);
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
}

export default App;
