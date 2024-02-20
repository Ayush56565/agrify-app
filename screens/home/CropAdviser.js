import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
    Button,
    Pressable,
    StyleSheet,
    Switch,
    Text,
    SafeAreaView,
    useWindowDimensions,
    TextInput, TouchableOpacity,
    ActivityIndicator,
    View,
} from "react-native";
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView
} from "@gorhom/bottom-sheet";
import { useRef, useState, useCallback, useEffect } from "react";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import axios from 'axios';



// SplashScreen.preventAutoHideAsync();
export default function CropAdviser() {
    <StatusBar style="auto" />
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        country: '',
        state: '',
        district: '',
        zipcode: '',
        phLevel: '',
        potassiumLevel: '',
        nitrogenLevel: '',
        hydrogenLevel: '',
    });
    const [darkmode, setDarkmode] = useState(false);
    const [device, setDevice] = useState(false);
    const { width } = useWindowDimensions();
    const [theme, setTheme] = useState("dim");
    const [isOpen, setIsOpen] = useState(false);

    const bottomSheetModalRef = useRef(null);
    const [rec, setRec] = useState();
    const snapPoints = ["48%", "85%"];

    function handlePresentModal() {
        bottomSheetModalRef.current?.present();
        setLoading(true)
        setRec()
        axios.post('https://us-central1-diseasedet.cloudfunctions.net/recommend_crop', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(response => {
                setRec(response.data.details);
                setLoading(false)
            })
            .catch(error => {
                console.error('There was a problem with the Axios request:', error);
                // Handle errors here
            });

        setTimeout(() => {
            setIsOpen(true);
        }, 1000);
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Cropify</Text>

                        <Text style={styles.subtitle}>Enter the details below to find the best crop recommendations</Text>
                    </View>

                    <KeyboardAwareScrollView>
                        <View style={styles.form}>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>Country</Text>

                                <TextInput
                                    onChangeText={country => setForm({ ...form, country })}
                                    // placeholder="India"
                                    placeholderTextColor="#6b7280"
                                    style={styles.inputControl}
                                    value={form.country} />
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>State</Text>

                                <TextInput
                                    onChangeText={state => setForm({ ...form, state })}
                                    // placeholder=""
                                    placeholderTextColor="#6b7280"
                                    style={styles.inputControl}
                                    value={form.state} />
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>District</Text>

                                <TextInput
                                    onChangeText={district => setForm({ ...form, district })}
                                    // placeholder="India"
                                    placeholderTextColor="#6b7280"
                                    style={styles.inputControl}
                                    value={form.district} />
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>Pin Code</Text>

                                <TextInput
                                    onChangeText={zipcode => setForm({ ...form, zipcode })}
                                    // placeholder="India"
                                    placeholderTextColor="#6b7280"
                                    style={styles.inputControl}
                                    value={form.zipcode} />
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>ph Level</Text>

                                <TextInput
                                    onChangeText={phLevel => setForm({ ...form, phLevel })}
                                    // placeholder="India"
                                    placeholderTextColor="#6b7280"
                                    style={styles.inputControl}
                                    value={form.phLevel} />
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>Potassium Level</Text>

                                <TextInput
                                    onChangeText={potassiumLevel => setForm({ ...form, potassiumLevel })}
                                    // placeholder="India"
                                    placeholderTextColor="#6b7280"
                                    style={styles.inputControl}
                                    value={form.potassiumLevel} />
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>Nitrogen Level</Text>

                                <TextInput
                                    onChangeText={nitrogenLevel => setForm({ ...form, nitrogenLevel })}
                                    // placeholder="India"
                                    placeholderTextColor="#6b7280"
                                    style={styles.inputControl}
                                    value={form.nitrogenLevel} />
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>Hydrogen Level</Text>

                                <TextInput
                                    onChangeText={hydrogenLevel => setForm({ ...form, hydrogenLevel })}
                                    // placeholder="India"
                                    placeholderTextColor="#6b7280"
                                    style={styles.inputControl}
                                    value={form.hydrogenLevel} />
                            </View>


                            <View style={styles.formAction}>
                                <TouchableOpacity
                                    onPress={
                                        handlePresentModal
                                    }>
                                    <View style={styles.btn}>
                                        <Text style={styles.btnText}>Submit</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
                <StatusBar style="auto" />
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    backgroundStyle={{ borderRadius: 50 }}
                    onDismiss={() => setIsOpen(false)}
                >
                    <BottomSheetScrollView>
                        <View style={styles.mcontentContainer}>
                            <Text style={[styles.mtitle, { marginBottom: 10 }]}>
                                Recommended Crops
                            </Text>

                            <View style={styles.formAction}>
                                <TouchableOpacity
                                >
                                    <View style={styles.mbox}>
                                        <Text style={styles.mText}>{rec}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </BottomSheetScrollView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </GestureHandlerRootView >
    );
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 80,
        paddingBottom: 10,
        paddingHorizontal: 0,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        flex: 1,
        backgroundColor: '#DCFFB7'
    },
    header: {
        marginVertical: 24,
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1d1d1d',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#929292',
    },
    /** Form */
    form: {
        paddingHorizontal: 24,
        flexDirection: 'column',
        flex: 4
    },
    formAction: {
        marginVertical: 24,
    },
    formFooter: {
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
        textAlign: 'center',
    },
    /** Input */
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
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
    },
    /** Button */
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        backgroundColor: '#007aff',
        borderColor: '#007aff',
    },
    btnText: {
        fontSize: 17,
        lineHeight: 24,
        fontWeight: '600',
        color: '#fff',
    },
    mcontainer: {
        flex: 1,
        backgroundColor: "gray",
        alignItems: "center",
        justifyContent: "center",
    },
    mcontentContainer: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 15,
    },
    mrow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    mtitle: {
        fontWeight: "900",
        letterSpacing: 0.5,
        fontSize: 16,
    },
    msubtitle: {
        color: "#101318",
        fontSize: 14,
        fontWeight: "bold",
    },
    mdescription: {
        color: "#56636F",
        fontSize: 13,
        fontWeight: "normal",
        width: "100%",
    },
});



// import "react-native-gesture-handler";
// import { StatusBar } from "expo-status-bar";
// import {
//     Button,
//     Pressable,
//     StyleSheet,
//     Switch,
//     Text,
//     useWindowDimensions,
//     View,
// } from "react-native";
// import {
//     BottomSheetModal,
//     BottomSheetModalProvider,
// } from "@gorhom/bottom-sheet";
// import { useRef, useState } from "react";
// import { AntDesign } from "@expo/vector-icons";
// import { Entypo } from "@expo/vector-icons";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// export default function App() {
//     const [darkmode, setDarkmode] = useState(false);
//     const [device, setDevice] = useState(false);
//     const { width } = useWindowDimensions();
//     const [theme, setTheme] = useState("dim");
//     const [isOpen, setIsOpen] = useState(false);

//     const bottomSheetModalRef = useRef(null);

//     const snapPoints = ["48%", "85%"];

//     function handlePresentModal() {
//         bottomSheetModalRef.current?.present();
//         setTimeout(() => {
//             setIsOpen(true);
//         }, 100);
//     }

//     return (
//         <GestureHandlerRootView style={{ flex: 1 }}>
//             <BottomSheetModalProvider>
//                 <View
//                     style={[
//                         styles.container,
//                         { backgroundColor: isOpen ? "gray" : "white" },
//                     ]}
//                 >
//                     <Button title="Present Modal" onPress={handlePresentModal} />
//                     <StatusBar style="auto" />
//                     <BottomSheetModal
//                         ref={bottomSheetModalRef}
//                         index={1}
//                         snapPoints={snapPoints}
//                         backgroundStyle={{ borderRadius: 50 }}
//                         onDismiss={() => setIsOpen(false)}
//                     >
//                         <View style={styles.contentContainer}>
//                             <Text style={[styles.title, { marginBottom: 20 }]}>
//                                 Dark mode
//                             </Text>
//                             <View style={styles.row}>
//                                 <Text style={styles.subtitle}>Dark mode</Text>
//                                 <Switch
//                                     value={darkmode}
//                                     onChange={() => setDarkmode(!darkmode)}
//                                 />
//                             </View>
//                             <View style={styles.row}>
//                                 <Text style={styles.subtitle}>Use device settings</Text>
//                                 <Switch value={device} onChange={() => setDevice(!device)} />
//                             </View>
//                             <Text style={styles.description}>
//                                 Set Dark mode to use the Light or Dark selection located in your
//                                 device Display and Brightness settings.
//                             </Text>
//                             <View
//                                 style={{
//                                     width: width,
//                                     borderBottomWidth: StyleSheet.hairlineWidth,
//                                     borderBottomColor: "gray",
//                                     marginVertical: 30,
//                                 }}
//                             />
//                             <Text style={[styles.title, { width: "100%" }]}>Theme</Text>
//                             <Pressable style={styles.row} onPress={() => setTheme("dim")}>
//                                 <Text style={styles.subtitle}>Dim</Text>
//                                 {theme === "dim" ? (
//                                     <AntDesign name="checkcircle" size={24} color="#4A98E9" />
//                                 ) : (
//                                     <Entypo name="circle" size={24} color="#56636F" />
//                                 )}
//                             </Pressable>
//                             <Pressable
//                                 style={styles.row}
//                                 onPress={() => setTheme("lightsOut")}
//                             >
//                                 <Text style={styles.subtitle}>Lights out</Text>
//                                 {theme === "lightsOut" ? (
//                                     <AntDesign name="checkcircle" size={24} color="#4A98E9" />
//                                 ) : (
//                                     <Entypo name="circle" size={24} color="#56636F" />
//                                 )}
//                             </Pressable>
//                         </View>
//                     </BottomSheetModal>
//                 </View>
//             </BottomSheetModalProvider>
//         </GestureHandlerRootView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "gray",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     contentContainer: {
//         flex: 1,
//         alignItems: "center",
//         paddingHorizontal: 15,
//     },
//     row: {
//         width: "100%",
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         marginVertical: 10,
//     },
//     title: {
//         fontWeight: "900",
//         letterSpacing: 0.5,
//         fontSize: 16,
//     },
//     subtitle: {
//         color: "#101318",
//         fontSize: 14,
//         fontWeight: "bold",
//     },
//     description: {
//         color: "#56636F",
//         fontSize: 13,
//         fontWeight: "normal",
//         width: "100%",
//     },
// });