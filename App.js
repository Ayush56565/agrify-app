import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import SplashScreen from './screens/splashScreen';
import AppNavigation from './navigation/appNavigation';
import RootNavigator from './navigation/rootnavigator';
// import AuthNavigation from './navigation/authNavigation';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';



export default function App() {
  return (
    <AppNavigation />
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
