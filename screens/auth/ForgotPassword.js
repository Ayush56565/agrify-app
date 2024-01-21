import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'
export default function ForgotPassword() {
    const route = useRoute();
    return (
        <SafeAreaView>
            <Text>Forgot Password</Text>
            <Text>UserId: {route.params.userId}</Text>
        </SafeAreaView>
    )
}