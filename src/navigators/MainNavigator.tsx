import React from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Image,
} from 'react-native';
import { colors } from '../theme';



import HomeScreen from '../screens/Main/HomeScreen';
import DayDrawScreen from '../screens/Main/DayDraw/DayDrawScreen';
import TendanceResultScreen from '../screens/Main/DayDraw/TendanceResultScreen';
import ProfilScreen from '../screens/Main/Profil/ProfilScreen';
// import IrisCreditScreen from '../screens/Main/IrisPage/IrisCreditScreen';
import DomainScreen from '../screens/Main/YesDraw/DomainSreen';
import YesDrawScreen from '../screens/Main/YesDraw/YesDrawScreen';
import DrawOneCardScreen from '../screens/Main/YesDraw/DrawOneCardScreen';
import YesDrawResultScreen from '../screens/Main/YesDraw/YesDrawResultScreen';
import CrossDrawScreen from '../screens/Main/CrossDraw/CrossDrawScreen';
import CrossDrawDomainScreen from '../screens/Main/CrossDraw/CrossDrawDomainScreen';
import CrossDrawQuestionScreen from '../screens/Main/CrossDraw/CrossDrawQuestionScreen';

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
    </CrossStack.Navigator>
  )
}

// // NAVIGATION FOR IRIS CREDIT
// function IrisStackScreen() {
//   return (
//     <IrisStack.Navigator>
//       <IrisStack.Screen name="IrisCredit"
//         component={IrisCreditScreen}
//         options={{ headerShown: false, }} />
//     </IrisStack.Navigator>
//   )
// }

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
            <View style={{ width: '100%', height: '100%', backgroundColor: colors.palette.ivory ,paddingTop:10, borderTopWidth: 0.5,borderTopColor: colors.palette.gold }} />
          ), 
          tabBarShowLabel: true,
          tabBarActiveTintColor: colors.palette.gold,
          tabBarInactiveTintColor: colors.palette.ivory,        
        })}
        


      >
        <Tab.Screen name="IrisClaire"
          component={HomeStackScreen}
          options={{
            headerShown: false,
            tabBarLabelStyle: { fontSize: 10, fontFamily: 'mulishLight', paddingBottom: 6 },
            tabBarIcon: () => (
              <Icon name="home" size={18} color={colors.palette.gold} />
            ),
            tabBarIconStyle: { marginTop: 2 },
            
          }}
        />

        {/* <Tab.Screen
          name="Tendance"
          component={TendanceStackScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Tendance du jour',
            tabBarLabelStyle: { fontSize: 14, fontFamily: 'mulishLight', color: colors.palette.ivory, paddingBottom: 6 },
            tabBarIcon: () => (
              <Icon name="star" size={28} color={colors.palette.ivory} />
            ),
            tabBarIconStyle: { marginTop: 4 },
            tabBarActiveTintColor: colors.palette.purple600,
          }}
        /> */}

        {/* <Tab.Screen
          name="Iris"
          component={IrisStackScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Boutique',
            tabBarLabelStyle: { fontSize: 8, fontFamily: 'mulishLight', color: colors.palette.ivory, paddingBottom: 6},
            tabBarIcon: () => (
              <Icon name="cart-plus" size={28} color={colors.palette.ivory}  />
            )
          }} /> */}

        <Tab.Screen
          name="Profil"
          component={ProfilStackScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Mon Compte',
            tabBarLabelStyle: { fontSize: 10, fontFamily: 'mulishLight', color: colors.palette.gold, paddingBottom: 6 },
            tabBarIcon: () => (
              <Icon name="user" size={18} color={colors.palette.gold} />
            ),
            tabBarIconStyle: { marginTop: 4 },
            tabBarActiveTintColor: colors.palette.gold,
          }} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}









