import React, {  useCallback, useEffect, useState } from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import 'react-native-gesture-handler';
import * as SystemUI from 'expo-system-ui';
import UserStack from './MainNavigator';
import AuthStack from './WelcomeNavigator';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import {
  Mulish_200ExtraLight as mulishExtraLight,
  Mulish_300Light as mulishLight,
  Mulish_400Regular as mulishRegular,
  Mulish_500Medium as mulishMedium,
  Mulish_600SemiBold as mulishSemiBold,
  Mulish_700Bold as mulishBold,
  Mulish_800ExtraBold as mulishExtraBold,
  Mulish_900Black as mulishBlack,
  Mulish_400Regular_Italic as mulishRegularItalic,
  
} from '@expo-google-fonts/mulish';

import {
  Oswald_200ExtraLight as oswaldExtraLight,
  Oswald_300Light as oswaldLight,
  Oswald_400Regular as oswaldRegular,
  Oswald_500Medium as oswaldMedium,
  Oswald_600SemiBold as oswaldSemiBold,
  Oswald_700Bold as oswaldBold,
} from '@expo-google-fonts/oswald';



export default function RootNavigation() {
  const { user } = useAuthentication();
  const [IsReady, SetIsReady] = useState(false);
 

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
         await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await SystemUI.getBackgroundColorAsync();
        
        await Font.loadAsync({
          mulishExtraLight,
          mulishLight,
          mulishRegular,
          mulishMedium,
          mulishSemiBold,
          mulishBold,
          mulishExtraBold,
          mulishBlack,
          mulishRegularItalic,
          oswaldExtraLight,
          oswaldLight,
          oswaldRegular,
          oswaldMedium,
          oswaldSemiBold,
          oswaldBold
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        SetIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (IsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [IsReady]);

  if (!IsReady) {
    return null;
  }

  return user ? <UserStack /> : <AuthStack />;
}