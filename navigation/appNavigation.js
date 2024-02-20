import React, { Profiler, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ForgotPassword from '../screens/auth/ForgotPassword';
// import PhoneAuth from '../screens/auth/phoneAuth';
import Profile from '../screens/home/Profile';
import BottomTabNavigator from './bottomTabNavigator'; import PhoneAuth from '../screens/auth/phoneAuth';
import { getItem } from '../asyncstorage';
import OnboardingScreen from '../screens/home/onboarding';
import useAuth from '../hooks/useAuth';
import Chatbot from '../screens/home/Chatbot';
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    // const [showOnboarding, setShowOnboarding] = useState(null);
    // useEffect(() => {
    //     checkIfAlreadyOnboarded();
    // }, [])

    // const checkIfAlreadyOnboarded = async () => {
    //     let onboarded = await getItem('onboarded');
    //     if (onboarded == 1) {
    //         // hide onboarding
    //         setShowOnboarding(false);
    //     } else {
    //         // show onboarding
    //         setShowOnboarding(true);
    //     }
    // }

    // if (showOnboarding == null) {
    //     return null;
    // }


    return (
        // <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
            {/* <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnboardingScreen} /> */}
            <Stack.Screen name="Home" options={{ headerShown: false }} component={BottomTabNavigator} />
            <Stack.Screen name="Profile" options={{ headerShown: false }} component={Profile} />
            <Stack.Screen name="Chatbot" options={{ headerShown: false }} component={Chatbot} />
        </Stack.Navigator>
        // </NavigationContainer>
    )
}
// else {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator initialRouteName='Welcome'>
//                 <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
//                 <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
//                 {/* <Stack.Screen name="App" options={{ headerShown: false }} component={AppNavigation} /> */}
//                 <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
//                 <Stack.Screen name="PhoneAuth" options={{ headerShown: false }} component={PhoneAuth} />
//                 <Stack.Screen name="ForgotPassword" options={{ headerShown: false }} component={ForgotPassword} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     )

// }


// import React, { useEffect, useState } from 'react'
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from '../screens/HomeScreen.js';
// import OnboardingScreen from '../screens/OnboardingScreen.js';
// import { getItem } from '../utils/asyncStorage.js';


// const Stack = createNativeStackNavigator();


// export default function AppNavigation() {

//     const [showOnboarding, setShowOnboarding] = useState(null);
//     useEffect(() => {
//         checkIfAlreadyOnboarded();
//     }, [])

//     const checkIfAlreadyOnboarded = async () => {
//         let onboarded = await getItem('onboarded');
//         if (onboarded == 1) {
//             // hide onboarding
//             setShowOnboarding(false);
//         } else {
//             // show onboarding
//             setShowOnboarding(true);
//         }
//     }

//     if (showOnboarding == null) {
//         return null;
//     }


//     if (showOnboarding) {
//         return (
//             <NavigationContainer>
//                 <Stack.Navigator initialRouteName='Onboarding'>
//                     <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnboardingScreen} />
//                     <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
//                 </Stack.Navigator>
//             </NavigationContainer>
//         )
//     } else {
//         return (
//             <NavigationContainer>
//                 <Stack.Navigator initialRouteName='Home'>
//                     <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnboardingScreen} />
//                     <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
//                 </Stack.Navigator>
//             </NavigationContainer>
//         )
//     }


// }