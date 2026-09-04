import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { SQLiteProvider } from 'expo-sqlite';
import { initDB } from './src/database/db';

export default function App() {
  return (
    <SQLiteProvider databaseName="APP.db" onInit={initDB}>
      <AppNavigator />
      <StatusBar style="light" />
    </SQLiteProvider>
  );
}