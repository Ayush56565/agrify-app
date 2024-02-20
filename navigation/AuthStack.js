import React, { Profiler } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ForgotPassword from '../screens/auth/ForgotPassword';
import Profile from '../screens/home/Profile';
import BottomTabNavigator from './bottomTabNavigator';
import PhoneAuth from '../screens/auth/phoneAuth';
import AppNavigation from './appNavigation';
const Stack = createNativeStackNavigator();

// import PhoneAuth from "../screens/auth/phoneAuth";

export default function AuthNavigation() {
    return (
        // <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>
            <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
            <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
            <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
            <Stack.Screen name="PhoneAuth" options={{ headerShown: false }} component={PhoneAuth} />
            <Stack.Screen name="ForgotPassword" options={{ headerShown: false }} component={ForgotPassword} />
        </Stack.Navigator>
        // </NavigationContainer>
    )
}
//     //     // else {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator initialRouteName='Welcome'>
//                 <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
//                 <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
//                 {/* <Stack.Screen name="App" options={{ headerShown: false }} component={AppNavigation} /> */}
//                 <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
//                 <Stack.Screen name="ForgotPassword" options={{ headerShown: false }} component={ForgotPassword} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     )
// }
