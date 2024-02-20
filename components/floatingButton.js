import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
const FloatingButton = () => {
    const navigation = useNavigation();
    return (
        <View style={{
            flex: 1
        }}>
            <TouchableOpacity
                style={styles.circle}
                onPress={() => {
                    navigation.navigate('Chatbot')
                }}
            >
                <Icon name="logo-ionitron" size={25} color="#FFFF" />
            </TouchableOpacity>
        </View>
    )

}

export default FloatingButton;

const styles = StyleSheet.create({
    circle: {
        backgroundColor: '#007aff',
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 40,
        right: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
