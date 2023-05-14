import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './src/config/firebaseConfig'
import RootNavigation from './src/navigators/AppNavigator';

export default function App() {

  return (
    <SafeAreaProvider>
      
        <RootNavigation />
     
    </SafeAreaProvider>
  );
}
