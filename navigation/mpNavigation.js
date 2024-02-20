import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/market/Home';
import MyCart from '../screens/market/MyCart';
import ProductInfo from '../screens/market/ProductInfo';
import { StatusBar } from 'expo-status-bar';

const MpNavigator = () => {
    const Stack = createNativeStackNavigator();
    <StatusBar style='auto' />

    return (
        <Stack.Navigator
            initialRouteName='Market'
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Market" component={Home} />
            <Stack.Screen name="MyCart" component={MyCart} />
            <Stack.Screen name="ProductInfo" component={ProductInfo} />
        </Stack.Navigator>
    );
};

export default MpNavigator;
