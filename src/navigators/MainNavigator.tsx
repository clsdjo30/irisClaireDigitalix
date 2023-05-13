import React from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Image,
} from 'react-native';
import { colors } from '../theme';



import HomeScreen from '../screens/Main/HomeScreen';
// import DayDrawScreen from '../screens/Main/YesDraw/DayDraw';
// import TendanceResultScreen from '../screens/Main/TendanceResultScreen';
// import ProfilScreen from '../screens/Main/Profil/ProfilScreen';
// import IrisCreditScreen from '../screens/Main/IrisPage/IrisCreditScreen';
// import YesDrawScreen from '../screens/Main/YesDraw/YesDrawScreen';
// import ChooseCardScreen from '../screens/Main/YesDraw/ChooseCardScreen';
// import CrossDrawScreen from '../screens/Main/CrossDraw/CrossDrawScreen';

const TendancceStack = createNativeStackNavigator();
const ProfilStack = createNativeStackNavigator();
const YesStack = createNativeStackNavigator();
const CrossStack = createNativeStackNavigator();
const IrisStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();


// NAVIGATION FOR TENDANCE DU JOUR
// function TendanceStackScreen() {
//   return (
//     <TendancceStack.Navigator>
//       <TendancceStack.Screen name="Tirage"
//         component={DayDrawScreen}
//         options={{ headerShown: false, }} />
//       <TendancceStack.Screen name="TendanceResult"
//         component={TendanceResultScreen}
//         options={{
//           headerShown: false,
//           animation: "slide_from_bottom",

//         }}
//       />
//     </TendancceStack.Navigator>
//   )
// }

// // NAVIGATION FOR PROFIL
// function ProfilStackScreen() {
//   return (
//     <ProfilStack.Navigator>
//       <ProfilStack.Screen name="Settings"
//         component={ProfilScreen}
//         options={{ headerShown: false, }} />
//     </ProfilStack.Navigator>
//   )
// }


// // NAVIGATION FOR YES DRAW
// function YesStackScreen() {
//   return (
//     <YesStack.Navigator>
//       <YesStack.Screen name="AskQuestion"
//         component={YesDrawScreen}
//         options={{ 
//           headerShown: false, 
//           }} />
//       <YesStack.Screen name="ChooseCard"
//         component={ChooseCardScreen}
//         options={{ headerShown: false, }} />
        
//     </YesStack.Navigator>
//   )
// }

// // NAVIGATION FOR CROSS DRAW
// function CrossStackScreen() {
//   return (
//     <CrossStack.Navigator>
//       <CrossStack.Screen name="AskCrossQuestion"
//         component={CrossDrawScreen}
//         options={{ headerShown: false, }} />
//     </CrossStack.Navigator>
//   )
// }

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

      {/* <HomeStack.Screen name="YesDraw"
        component={YesStackScreen}
        options={{ headerShown: false, }} />
      <HomeStack.Screen name="CrossDraw"
        component={CrossStackScreen}
        options={{ headerShown: false, }} /> */}
    </HomeStack.Navigator>
  )
}


// NAVIGATION PRINCIPALE  
const Tab = createBottomTabNavigator();

export default function UserStack() {
  

  return (
    <NavigationContainer>
      <Tab.Navigator
      sceneContainerStyle={{width: '100%', height:'100%',}}
      screenOptions={({ route }) => ({
        tabBarStyle: ((route) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? ""
          console.log(routeName)
          if (routeName === 'YesDraw' || routeName === 'CrossDraw') {
            return { display: "none" }
          }
          return
        })(route),
        tabBarBackground: () => (
          <View style={{ width: '100%', height:'100%', backgroundColor: colors.palette.purple600}} />
        ),
      })}
          
       
      >
        <Tab.Screen name="IrisClaire"
          component={HomeStackScreen}
          options={{ 
            headerShown: false,
            tabBarLabelStyle: { fontSize: 14, fontFamily: 'mulishLight', color: colors.palette.ivory, paddingBottom: 6},
            // tabBarIcon: ({size, color}) => (
             
            //     <Icon name="home" size={30} color={colors.palette.ivory}  />
        
             
            // )
          }}
        />

        {/* <Tab.Screen
          name="Tendance"
          component={TendanceStackScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Tendance du jour',
            tabBarLabelStyle: { fontSize: 12, fontFamily: 'mulishLight', color: colors.palette.ivory, paddingBottom: 6},
            tabBarIcon: () => (
              <Icon name="star" size={28} color={colors.palette.ivory}  />
            ),
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

        {/* <Tab.Screen
          name="Profil"
          component={ProfilStackScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Mon Compte',
            tabBarLabelStyle: { fontSize: 8, fontFamily: 'mulishLight', color: colors.palette.ivory, paddingBottom: 6},
            tabBarIcon: () => (
              <Icon name="gear" size={28} color={colors.palette.ivory}  />
            )
          }} /> */}

      </Tab.Navigator>
    </NavigationContainer>
  );
}









