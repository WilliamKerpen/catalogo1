import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/navigation/AppNavigator";

import { SQLiteProvider } from "expo-sqlite";
import { initDB } from "./src/database/db";

import { Provider } from "react-redux";
import { store } from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <SQLiteProvider
        databaseName="APP.db"
        onInit={initDB}
      >
        <AppNavigator />

        <StatusBar style="light" />
      </SQLiteProvider>
    </Provider>
  );
}