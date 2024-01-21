import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { themeColors } from '../../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase'
export default function PhoneAuth() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // const handleSubmit = async () => {
    //     if (email && password) {
    //         try {
    //             await createUserWithEmailAndPassword(auth, email, password);
    //         }
    //         catch (err) {
    //             console.log('error: ', err.message);
    //         }
    //     }
    // }
    return (
        <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.bg }}>
            <SafeAreaView className="flex">
                <View className="flex-row justify-start">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
                    >
                        <ArrowLeftIcon size="20" color="black" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center">
                    <Image source={require('../../assets/images/signup.png')}
                        style={{ width: 165, height: 110 }} />
                </View>
            </SafeAreaView>
            <View className="flex-1 bg-white px-8 pt-8"
                style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
                <View className="form space-y-0.5">
                    <Text className="text-gray-700 ml-4">Full Name</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                        placeholder='Enter Name'
                        value={name}
                        onChangeText={value => setName(value)}
                    />
                    <Text className="text-gray-700 ml-4"> Address</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                        placeholder='Enter Email'
                        value={email}
                        onChangeText={value => setEmail(value)}
                    />
                    <Text className="text-gray-700 ml-4">Password</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                        secureTextEntry
                        placeholder='Enter Password'
                        value={password}
                        onChangeText={value => setPassword(value)}
                    />
                    <TouchableOpacity
                        className="py-3 bg-yellow-400 rounded-xl"

                    >
                        <Text className="text-xl font-bold text-center text-gray-700">
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center mt-7 pb-9">
                    <Text className="text-gray-500 font-semibold">Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text className="font-semibold text-yellow-500"> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}