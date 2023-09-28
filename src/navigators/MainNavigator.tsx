import React from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  View,
  Image
} from 'react-native';
import { colors } from '../theme';

import homeIcon from '../../assets/icons/eye.png';
import profilIcon from '../../assets/icons/account.png';
import irisIcon from '../../assets/icons/iris.png';
import ball from '../../assets/icons/crystal_ball.png';

import HomeScreen from '../screens/Main/HomeScreen';
import DayDrawScreen from '../screens/Main/DayDraw/DayDrawScreen';
import TendanceResultScreen from '../screens/Main/DayDraw/TendanceResultScreen';
import ProfilScreen from '../screens/Main/Profil/ProfilScreen';
import SaveQuestionScreen from '../screens/Main/Profil/SaveQuestionScreen';
import BuyIrisScreen from '../screens/Main/IrisPage/BuyIrisScreen';
import DomainScreen from '../screens/Main/YesDraw/DomainSreen';
import YesDrawScreen from '../screens/Main/YesDraw/YesDrawScreen';
import DrawOneCardScreen from '../screens/Main/YesDraw/DrawOneCardScreen';
import YesDrawResultScreen from '../screens/Main/YesDraw/YesDrawResultScreen';
import CrossDrawScreen from '../screens/Main/CrossDraw/CrossDrawScreen';
import CrossDrawDomainScreen from '../screens/Main/CrossDraw/CrossDrawDomainScreen';
import CrossDrawQuestionScreen from '../screens/Main/CrossDraw/CrossDrawQuestionScreen';
import CrossDrawResultScreen from '../screens/Main/CrossDraw/CrossDrawResultScreen';
import FirstNameScreen from '../screens/Register/FirstNameScreen';
import GenreScreen from '../screens/Register/GenreScreen';
import BirthDayScreen from '../screens/Register/BirthdayScreen';
import LoadingScreen from '../components/reusable/LoadingScreen';
import DrawLoadingScreen from '../components/reusable/DrawLoadingScreen';
import FaqScreen from '../screens/Main/Profil/FaqScreen';

const DayDrawStack = createNativeStackNavigator();
const ProfilStack = createNativeStackNavigator();
const YesStack = createNativeStackNavigator();
const CrossStack = createNativeStackNavigator();
const IrisStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();


// NAVIGATION FOR TENDANCE DU JOUR
function DayDrawStackScreen() {
  return (
    <DayDrawStack.Navigator>
      <DayDrawStack.Screen name="Tirage"
        component={DayDrawScreen}
        options={{ headerShown: false, }} />

      <DayDrawStack.Screen name="TendanceResult"
        component={TendanceResultScreen}
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />
    </DayDrawStack.Navigator>
  )
}

// // NAVIGATION FOR PROFIL
function ProfilStackScreen() {
  return (
    <ProfilStack.Navigator>
      <ProfilStack.Screen name="Settings"
        component={ProfilScreen}
        options={{ headerShown: false, }} />
      <ProfilStack.Screen name="MyQuestions"
        component={SaveQuestionScreen}
        options={{ headerShown: false, }} />
      <ProfilStack.Screen name="Faq"
        component={FaqScreen}
        options={{ headerShown: false, }} />
      <ProfilStack.Screen name="FirstName"
        component={FirstNameScreen}
        options={{ headerShown: false, }} />
      <ProfilStack.Screen name="Genre"
        component={GenreScreen}
        options={{ headerShown: false, }} />
      <ProfilStack.Screen name="Birthday"
        component={BirthDayScreen}
        options={{ headerShown: false, }} />
      <ProfilStack.Screen name="Loading"
        component={LoadingScreen}
        options={{ headerShown: false, }} />
    </ProfilStack.Navigator>
  )
}


// // NAVIGATION FOR YES DRAW

function YesStackScreen() {
  return (
    <YesStack.Navigator
      initialRouteName='Domain'
    >
      <YesStack.Screen name="Domain"
        component={DomainScreen}
        options={{ headerShown: false, }} />

      <YesStack.Screen name="AskQuestion"
        component={YesDrawScreen}
        options={{
          headerShown: false,
        }} />
      <YesStack.Screen name="DrawOneCard"
        component={DrawOneCardScreen}
        options={{ headerShown: false, }} />

      <YesStack.Screen name="YesDrawResult"
        component={YesDrawResultScreen}
        options={{ headerShown: false, }} />


    </YesStack.Navigator>
  )
}

// // NAVIGATION FOR CROSS DRAW
function CrossStackScreen() {
  return (
    <CrossStack.Navigator
      initialRouteName='ChooseDomain'
    >
      <CrossStack.Screen name="ChooseDomain"
        component={CrossDrawDomainScreen}
        options={{ headerShown: false, }} />
      <CrossStack.Screen name="AskCrossQuestion"
        component={CrossDrawQuestionScreen}
        options={{ headerShown: false, }} />
      <CrossStack.Screen name="DrawCard"
        component={CrossDrawScreen}
        options={{ headerShown: false, }} />
      <CrossStack.Screen name="Loading"
        component={DrawLoadingScreen}
        options={{ headerShown: false, }} />
      <CrossStack.Screen name="DrawResult"
        component={CrossDrawResultScreen}
        options={{ headerShown: false, }} />
    </CrossStack.Navigator>
  )
}

// NAVIGATION FOR IRIS CREDIT
function IrisStackScreen() {
  return (
    <IrisStack.Navigator>
      <IrisStack.Screen name="BuyIris"
        component={BuyIrisScreen}
        options={{ headerShown: false, }} />
    </IrisStack.Navigator>
  )
}

// // NAVIGATION FOR HOME with 2 nested navigation
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home"
        component={HomeScreen}
        options={{ headerShown: false, }} />

      <HomeStack.Screen name="YesDraw"
        component={YesStackScreen}
        options={{ headerShown: false, }} />

      <HomeStack.Screen name="CrossDraw"
        component={CrossStackScreen}
        options={{ headerShown: false, }} />

      <HomeStack.Screen name="DayDraw"
        component={DayDrawStackScreen}
        options={{ headerShown: false, }} />

      <HomeStack.Screen name="TendanceResult"
        component={TendanceResultScreen}
        options={{ headerShown: false, }} />

    </HomeStack.Navigator>
  )
}


// NAVIGATION PRINCIPALE  
const Tab = createBottomTabNavigator();

export default function UserStack() {


  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: ((route) => {

            const routeName = getFocusedRouteNameFromRoute(route) ?? ""
            if (routeName === 'YesDraw' || routeName === 'CrossDraw' || routeName === 'DayDraw' || routeName === 'TendanceResult') {
              return { display: "none" }
            }
            return
          })(route),
          tabBarBackground: () => (
            <View style={{ width: '100%', height: '100%', backgroundColor: colors.palette.violetBg, paddingTop: 10, borderTopWidth: 0.5, borderTopColor: colors.palette.gold }} />
          ),
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.palette.violet,
          focused: true,
        })}



      >
        <Tab.Screen
          name="IrisClaire"
          component={HomeStackScreen}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <Image source={homeIcon} style={{ width: 30, height: 30, tintColor: focused ? colors.palette.violet : colors.palette.golden }} />
            )
          }}
        />

        <Tab.Screen
          name="Iris"
          component={IrisStackScreen}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <Image source={irisIcon} style={{ width: 25, height: 25, tintColor: focused ? colors.palette.violet : colors.palette.golden }} />
            ),
            tabBarActiveTintColor: colors.palette.violet,
          }}
        />

        <Tab.Screen
          name="Profil"
          component={ProfilStackScreen}
          options={{
            headerShown: false, tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <Image source={profilIcon} style={{ width: 30, height: 30, tintColor: focused ? colors.palette.violet : colors.palette.golden }} />
            ),
            tabBarActiveTintColor: colors.palette.violet,
          }} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}









