import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StepperScreen from '../screens/Welcome/StepperScreen';
import StepOneScreen from '../screens/Welcome/StepOneScreen';
import StepTwoScreen from '../screens/Welcome/StepTwoScreen';
import FirstName from '../screens/Register/FirstNameScreen';
import Genre from '../screens/Register/GenreScreen';
import Birthday from '../screens/Register/BirthdayScreen';
import SignupScreen from '../screens/Register/SignupScreen';
import LoginScreen from '../screens/Register/LoginScreen';

const Stack = createStackNavigator();

export default function AuthStack() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StepperScreen" component={StepperScreen} options={{ headerShown: false }} />
        <Stack.Screen name="StepOne" component={StepOneScreen} options={{ headerShown: false }} />
        <Stack.Screen name="StepTwo" component={StepTwoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FirstName" component={FirstName} options={{ headerShown: false }} />
        <Stack.Screen name="Genre" component={Genre} options={{ headerShown: false }} />
        <Stack.Screen name="Birthday" component={Birthday} options={{ headerShown: false }} />
        <Stack.Screen name="Sign Up" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}