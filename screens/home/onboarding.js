import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { setItem } from '../../asyncstorage';
import LottieView from 'lottie-react-native';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
    const navigation = useNavigation();

    const handleDone = () => {
        navigation.navigate('Home');
        setItem('onboarded', '1');
    }

    const doneButton = ({ ...props }) => {
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text>Done</Text>
            </TouchableOpacity>
        )

    }
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Onboarding
                onDone={handleDone}
                onSkip={handleDone}
                // bottomBarHighlight={false}
                DoneButtonComponent={doneButton}
                containerStyles={{ paddingHorizontal: 15 }}
                pages={[
                    {
                        backgroundColor: '#a7f3d0',
                        image: (
                            <View style={styles.lottie}>
                                {/* <Lottie source={require('../../assets/animations/boost.json')} /> */}
                                <Image source={require('../../assets/images/pic1-removebg-preview.png')} style={{ width: 300, height: 300 }} />
                            </View>
                        ),
                        title: 'Effortless buying experience',
                        subtitle: 'Streamline your purchasing with a few taps',
                    },
                    {
                        backgroundColor: '#fef3c7',
                        image: (
                            <View style={styles.lottie}>
                                {/* <Lottie source={require('../../assets/images/pic3-removebg-preview.png')} style={{ width: 300, height: 300 }} /> */}
                                <Image source={require('../../assets/images/pic3-removebg-preview.png')} style={{ width: 300, height: 300 }} />
                            </View>
                        ),
                        title: 'Reliable disease detection  ',
                        subtitle: 'Detecting plant diseases is now easier than ever.',
                    },
                    {
                        backgroundColor: '#DCFFB7',
                        image: (
                            <View style={styles.lottie}>
                                <Image source={require('../../assets/images/pic2-removebg-preview.png')} style={{ width: 300, height: 300 }} />
                                {/* <Lottie source={require('../../assets/images/pic2-removebg-preview.png')} style={{ width: 300, height: 300 }} /> */}
                            </View>
                        ),
                        title: 'AI in your hands',
                        subtitle: 'Seamless crop reccomendations just one click away',
                    },
                ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    lottie: {
        width: 300,
        height: 400
    },
    doneButton: {
        padding: 20,
        // backgroundColor: 'white',
        // borderTopLeftRadius: '100%',
        // borderBottomLeftRadius: '100%'
    }
})