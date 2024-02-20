import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { themeColors } from '../../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestoreDB } from '../../config/firebase'
import { avatars } from "../../utils/supports";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

import { doc, setDoc } from 'firebase/firestore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default function SignUpScreen() {

    const screenWidth = Math.round(Dimensions.get("window").width);
    const screenHeight = Math.round(Dimensions.get("window").height);

    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [avatar, setAvatar] = useState(avatars[0]?.image.asset.url);
    const [isAvatarMenu, setIsAvatarMenu] = useState(false);

    const handleAvatar = (item) => {
        setAvatar(item?.image.asset.url);
        setIsAvatarMenu(false);
    };

    const handleSubmit = async () => {
        if (email && password) {
            try {
                await createUserWithEmailAndPassword(auth, email, password).then(
                    (userCred) => {
                        const data = {
                            uid: userCred?.user.uid,
                            displayName: name,
                            photoURL: avatar,
                            phoneNumber: phonenumber
                        };
                        setDoc(doc(firestoreDB, "users", userCred?.user.uid), data)
                        console.log(auth.currentUser.uid)
                        // userCred.user.displayName = name;
                        // userCred.user.photoURL = avatar;
                        // userCred.user.phoneNumber = phonenumber;
                    }
                );
            }
            // createNewUser: userData => {
            //     return firebase
            //       .firestore()
            //       .collection('users')
            //       .doc(`${userData.uid}`)
            //       .set(userData)
            //   }
            catch (err) {
                console.log('error: ', err.message);
            }
        }
    }
    return (
        <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.bg }}>
            <SafeAreaView className="flex">
                <View className="flex-row justify-center">
                    <Image source={require('../../assets/images/signup.png')}
                        style={{ width: 165, height: 110 }} />
                </View>
            </SafeAreaView>

            {isAvatarMenu && (
                <>
                    {/* list of avatars sections */}
                    <View
                        className="absolute  inset-0 z-10"
                        style={{ width: screenWidth, height: screenHeight }}
                    >
                        <ScrollView>
                            <BlurView
                                className="w-full h-full px-4 py-16 flex-row flex-wrap items-center justify-evenly"
                                tint="light"
                                intensity={40}
                                style={{ width: screenWidth, height: screenHeight }}
                            >
                                {avatars?.map((item) => (
                                    <TouchableOpacity
                                        onPress={() => handleAvatar(item)}
                                        key={item._id}
                                        className="w-20 m-3 h-20 p-1 rounded-full border-2 border-primary relative"
                                    >
                                        <Image
                                            source={{ uri: item?.image.asset.url }}
                                            className="w-full h-full"
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                ))}
                            </BlurView>
                        </ScrollView>
                    </View>
                </>
            )}

            <KeyboardAwareScrollView className="flex-1 bg-white px-8"
                style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
                <View className="form space-y-0.5">
                    <View className="w-full flex items-center justify-center relative -my-4 pt-7 pb-7">
                        <TouchableOpacity
                            onPress={() => setIsAvatarMenu(true)}
                            className="w-20 h-20 p-1 rounded-full border-2 border-primary relative"
                        >
                            <Image
                                source={{ uri: avatar }}
                                className="w-full h-full"
                                resizeMode="contain"
                            />
                            <View className="w-6 h-6 bg-primary rounded-full absolute top-0 right-0 flex items-center justify-center">
                                <MaterialIcons name="edit" size={18} color={"#fff"} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Text className="text-gray-700 ml-4 ">Full Name</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3 pt-4"
                        placeholder='Enter full name'
                        value={name}
                        onChangeText={value => setName(value)}
                    />
                    <Text className="text-gray-700 ml-4">Email</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                        placeholder='Enter email'
                        value={email}
                        onChangeText={value => setEmail(value)}
                    />
                    <Text className="text-gray-700 ml-4">Phone Number</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                        placeholder='Enter phone number'
                        value={phonenumber}
                        onChangeText={value => setPhonenumber(value)}
                    />
                    <Text className="text-gray-700 ml-4">Password</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                        secureTextEntry
                        placeholder='Enter password'
                        value={password}
                        onChangeText={value => setPassword(value)}
                    />
                    <TouchableOpacity
                        className="py-3 bg-yellow-400 rounded-xl"
                        onPress={handleSubmit}
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
            </KeyboardAwareScrollView>
        </View >
    )
}