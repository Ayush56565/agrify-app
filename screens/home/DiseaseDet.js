import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    ActivityIndicator
} from 'react-native';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { storage, db } from '../../config/firebase'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'

export default function DiseaseDet() {
    const [selectedImage, setSelectedImage] = useState();
    const [answer, setAnswer] = useState();
    const uploadImage = async (mode) => {
        try {
            if (mode == "gallery") {
                await ImagePicker.requestMediaLibraryPermissionsAsync();
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });
            }
            else {
                await ImagePicker.requestCameraPermissionsAsync();
                result = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    base64: true,
                    aspect: [1, 1],
                    quality: 1,
                });;
            }
            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri);
                setAnswer()
                await uploadImageFB(result.assets[0].uri, "image");
            }
        } catch (err) {
            alert("Error uploading image: " + err);
        }
    };

    async function saveRecord(fileType, url, createdAt) {
        try {
            const docRef = await addDoc(collection(db, "files"), {
                fileType,
                url,
                createdAt,
            });
        } catch (e) {
            console.log(e);
        }
    }




    let link1 = "";
    async function uploadImageFB(uri, fileType) {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, "Stuff/" + new Date().getTime());
        const uploadTask = uploadBytesResumable(storageRef, blob);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log("Upload is " + progress + "% done");
            },
            (error) => {
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    link1 = downloadURL;
                    await saveRecord(fileType, downloadURL, new Date().toISOString());
                    axios.post('https://us-central1-diseasedet.cloudfunctions.net/predict1', { link: link1 }, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                        .then(response => {
                            setAnswer(response.data.details);
                        })
                        .catch(error => {
                            console.error('There was a problem with the Axios request:', error);
                        });
                });
            },
        );
    }


    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
            <View style={styles.container}>
                <View style={styles.header}>

                    <Text style={styles.title}>
                        <Text style={{ color: '#075eec' }}>Disease Detection</Text>
                    </Text>

                    <Text style={styles.subtitle}>
                        Upload a photo of your plant below
                    </Text>
                </View>

                <View style={styles.form}>
                    <Image
                        alt=""
                        resizeMode="contain"
                        style={styles.headerImg}
                        source={{
                            uri: selectedImage,
                        }}
                    />


                    <View style={styles.formAction}>
                        <TouchableOpacity
                            onPress={() => uploadImage()}>
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>Take a photo</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formAction}>
                        <TouchableOpacity
                            onPress={() => uploadImage("gallery")}>
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>Upload from Gallery</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.asubtitle}> Response</Text>
                    <View style={styles.formAction}>
                        <View style={styles.abtn}>
                            <Text style={styles.abtnText}>{answer}</Text>
                        </View>
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}></Text>
                    </View>

                </View>
            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        backgroundColor: "#DCFFB7"
    },
    header: {
        marginVertical: 36,
    },
    headerImg: {
        width: 300,
        height: 300,
        alignSelf: 'center',
        marginBottom: 1,
    },
    title: {
        fontSize: 27,
        fontWeight: '700',
        color: '#1d1d1d',
        marginBottom: 6,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#929292',
        textAlign: 'center',
    },
    asubtitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#1d1d1d',
        textAlign: 'center',
    },
    form: {
        marginBottom: 24,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    formAction: {
        marginVertical: 24,
    },
    formFooter: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        textAlign: 'center',
        letterSpacing: 0.15,
    },
    input: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        marginBottom: 8,
    },
    inputControl: {
        height: 44,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: '#075eec',
        borderColor: '#075eec',
    },
    abtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#075eec',
    },
    btnText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#fff',
    },
    abtnText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#1d1d1d',
    },
});