import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import Chatbot from '../screens/home/Chatbot';
// import Marketplace from '../screens/home/Marketplace';
import Profile from '../screens/home/Profile';
import Icon from 'react-native-vector-icons/Ionicons';
import CropAdviser from '../screens/home/CropAdviser';
import DiseaseDet from '../screens/home/DiseaseDet';
import MessagesScreen from '../screens/messages/MessagesScreen';
import MpNavigator from './mpNavigation';
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName='Home '
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarInactiveTintColor: '#444',
                tabBarActiveTintColor: '#007aff',
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName;

                    if (route.name === 'Home ') {
                        iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
                    } else if (route.name === 'DiseaseDet') {
                        iconName = focused ? 'fitness' : 'fitness-outline';
                    } else if (route.name === 'Messages') {
                        iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
                    } else if (route.name === 'Marketplace') {
                        iconName = focused
                            ? 'cart'
                            : 'cart-outline';
                    }
                    else if (route.name === 'Crop Adviser') {
                        iconName = focused ? 'leaf' : 'leaf-outline'
                    }

                    return <Icon name={iconName} size={22} color={color} />;
                },
            })}>
            <Tab.Screen name="Messages" component={MessagesScreen} />
            <Tab.Screen name="Marketplace" component={MpNavigator} />
            <Tab.Screen name="Home " component={HomeScreen} />
            <Tab.Screen name="Crop Adviser" component={CropAdviser} />
            <Tab.Screen name="DiseaseDet" component={DiseaseDet} />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;