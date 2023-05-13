import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
// import './app/config/firebaseConfig'
import RootNavigation from './src/navigators/AppNavigator';

export default function App() {

  return (
    <SafeAreaProvider>
      
        <RootNavigation />
     
    </SafeAreaProvider>
  );
}
