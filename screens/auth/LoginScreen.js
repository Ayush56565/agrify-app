import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { themeColors } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { SET_USER } from "../../context/actions/userActions";
import { useState, useContext } from 'react'
import { useDispatch } from "react-redux";

export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const {}
    const handleLogin = async () => {
        if (email && password) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
            }
            catch (err) {
                console.log('error: ', err.message);
            }
        }
    }
    // const handleLogin = async () => {
    //     if (email && password) {
    //         await signInWithEmailAndPassword(auth, email, password)
    //             .then((userCred) => {
    //                 if (userCred) {
    //                     // console.log("User Id:", userCred?.user.uid);
    //                     getDoc(doc(firestoreDB, "users", userCred?.user.uid)).then(
    //                         (docSnap) => {
    //                             if (docSnap.exists()) {
    //                                 console.log("User Data : ", docSnap.data());
    //                                 navigation.navigate('Home')
    //                                 // dispatch(SET_USER(docSnap.data()));
    //                             }
    //                         }
    //                     );
    //                 }
    //             })
    //             .catch((err) => {
    //                 console.log("Error : ", err.message);
    //                 // if (err.message.includes("wrong-password")) {
    //                 //     setAlert(true);
    //                 //     setAlertMessage("Password Mismatch");
    //                 // } else if (err.message.includes("user-not-found")) {
    //                 //     setAlert(true);
    //                 //     setAlertMessage("User Not Found");
    //                 // } else {
    //                 //     setAlert(true);
    //                 //     setAlertMessage("Invalid Email Address");
    //                 // }
    //                 // setInterval(() => {
    //                 //     setAlert(false);
    //                 // }, 2000);
    //             });
    //     }
    // };



    return (
        <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.bg }}>
            <SafeAreaView className="flex ">
                <View className="flex-row justify-start">
                    <TouchableOpacity onPress={() => navigation.goBack()}
                        className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
                        <ArrowLeftIcon size="20" color="black" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center">
                    <Image source={require('../../assets/images/login.png')}
                        style={{ width: 150, height: 150 }} />
                </View>
            </SafeAreaView>
            <View
                style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
                className="flex-1 bg-white px-8 pt-8">
                <View className="form space-y-0.5">
                    <Text className="text-gray-700 ml-4">Email Address</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                        placeholder="Enter email"
                        value={email}
                        onChangeText={value => setEmail(value)}
                    />
                    <Text className="text-gray-700 ml-4">Password</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
                        secureTextEntry
                        placeholder="Enter password"
                        value={password}
                        onChangeText={value => setPassword(value)}
                    />
                    <TouchableOpacity className="flex items-end" onPress={() => navigation.navigate('ForgotPassword', {
                        userId: 'ajax101'
                    })}>
                        <Text className="text-gray-700 mb-5">Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="py-3 bg-yellow-400 rounded-xl"
                        onPress={handleLogin}
                    >
                        <Text
                            className="text-xl font-bold text-center text-gray-700"
                        >
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* <Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>
                <View className="flex-row justify-center space-x-12">
                    <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                        <Image source={require('../../assets/icons/google.png')} className="w-10 h-10" />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                        <Image source={require('../../assets/icons/apple.png')} className="w-10 h-10" />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                        <Image source={require('../../assets/icons/facebook.png')} className="w-10 h-10" />
                    </TouchableOpacity>
                </View> */}
                <View className="flex-row justify-center mt-7 pb-9" >
                    <Text className="text-gray-500 font-semibold">
                        Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text className="font-semibold text-yellow-500"> Sign Up</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>

    )
}