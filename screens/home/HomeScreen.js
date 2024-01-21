import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import { UserIcon } from 'react-native-heroicons/solid'

const items = [
    {
        img: 'https://plus.unsplash.com/premium_photo-1661281316103-9aef5ad47c50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
        title: 'New Study Finds Link Between Exercise and Brain Function',
        author: 'Samantha Lee',
        authorImg:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
        tag: 'health',
        date: 'Mar 24, 2023',
    },
    {
        img: 'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
        title: 'Tech Giant Announces New Line of Smart Home Devices',
        author: 'John Smith',
        authorImg:
            'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
        tag: 'technology',
        date: 'Mar 23, 2023',
    },
    {
        img: 'https://images.unsplash.com/photo-1605367177286-f3d4789c47a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80',
        title: 'City Council Approves Plan to Expand Public Transportation',
        author: 'Emily Chen',
        authorImg:
            'https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1389&q=80',
        tag: 'politics',
        date: 'Mar 22, 2023',
    },
    {
        img: 'https://images.unsplash.com/photo-1565615833231-e8c91a38a012?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
        title: "Researchers Discover Potential Treatment for Alzheimer's",
        author: 'Samantha Lee',
        authorImg:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
        tag: 'health',
        date: 'Mar 21, 2023',
    },
    {
        img: 'https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2344&q=80',
        title: 'New Startup Aims to Revolutionize Electric Car Market',
        author: 'John Smith',
        authorImg:
            'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
        tag: 'technology',
        date: 'Mar 20, 2023',
    },
    {
        img: 'https://plus.unsplash.com/premium_photo-1663050986883-a5bdd99a7fa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2362&q=80',
        title: 'Local Election Results Are In: Democrats Retain Majority',
        author: 'Emily Chen',
        authorImg:
            'https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1389&q=80',
        tag: 'politics',
        date: 'Mar 19, 2023',
    },
];

export default function HomeScreen() {
    <StatusBar style="light" />
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>News Feed</Text>
                    <TouchableOpacity
                        className=" p-7 rounded-tr-2xl rounded-bl-2xl ml-20"
                        onPress={() => navigation.navigate('Profile')}>
                        <UserIcon size="25" color="black" />
                    </TouchableOpacity>
                </View>
                {items.map(({ img, title, author, authorImg, tag, date }, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                // handle onPress
                            }}>
                            <View style={styles.card}>
                                <Image
                                    alt=""
                                    resizeMode="cover"
                                    source={{ uri: img }}
                                    style={styles.cardImg}
                                />

                                <View style={styles.cardBody}>
                                    <Text style={styles.cardTag}>{tag}</Text>

                                    <Text style={styles.cardTitle}>{title}</Text>

                                    <View style={styles.cardRow}>
                                        <View style={styles.cardRowItem}>
                                            <Image
                                                alt=""
                                                source={{ uri: authorImg }}
                                                style={styles.cardRowItemImg}
                                            />

                                            <Text style={styles.cardRowItemText}>{author}</Text>
                                        </View>

                                        <Text style={styles.cardRowDivider}>·</Text>

                                        <View style={styles.cardRowItem}>
                                            <Text style={styles.cardRowItemText}>{date}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 40,
        marginRight: 1,
        paddingHorizontal: 10,
        backgroundColor: '#DCFFB7'
    },
    header: {
        flex: 1,
        flexDirection: 'row',
    },
    title: {
        fontSize: 30,
        fontWeight: '600',
        color: '#1d1d1d',
        marginBottom: 12,
        marginTop: 15,
        marginRight: 12,
        paddingRight: 12

    },
    card: {
        flexDirection: 'row',
        alignItems: 'stretch',
        borderRadius: 12,
        marginBottom: 16,
        marginRight: 5,
        backgroundColor: '#DCFFB7',
    },
    cardImg: {
        width: 96,
        height: 96,
        borderRadius: 12,
    },
    cardBody: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 16,
    },
    cardTag: {
        fontWeight: '500',
        fontSize: 12,
        color: '#939393',
        marginBottom: 7,
        textTransform: 'capitalize',
    },
    cardTitle: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 19,
        color: '#000',
        marginBottom: 8,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: -8,
        marginBottom: 'auto',
    },
    cardRowDivider: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#939393',
    },
    cardRowItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
        borderRightWidth: 1,
        borderColor: 'transparent',
    },
    cardRowItemText: {
        fontWeight: '400',
        fontSize: 13,
        color: '#939393',
    },
    cardRowItemImg: {
        width: 22,
        height: 22,
        borderRadius: 9999,
        marginRight: 6,
    },
});