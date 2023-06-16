import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import './src/config/firebaseConfig'
import RootNavigation from './src/navigators/AppNavigator';

export default function App() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider style={{ flex: 1 }}>
      <RootNavigation />
      </SafeAreaProvider>
    </GestureHandlerRootView>

  );
}
