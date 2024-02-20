import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
} from 'react';
import { TouchableOpacity, Text, View, TextInput } from 'react-native';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { Icon } from 'react-native-elements';

import { getAuth } from "firebase/auth";
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot, doc, getDoc
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { firestoreDB, auth } from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../../colors';


export default function Chat() {

    const [messages, setMessages] = useState([]);
    const [userInfo, setUserInfo] = useState('');
    const navigation = useNavigation();
    // const user = auth.currentUser;
    // const displayName = user.displayName;
    // const email = user.email;
    // const photoURL = user.photoURL;
    // const uid = user.uid;
    const onSignOut = () => {
        signOut(auth).catch(error => console.log('Error logging out: ', error));
    };

    const getUser = async () => {
        const docRef = doc(firestoreDB, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            setUserInfo(docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        marginRight: 10
                    }}
                    onPress={onSignOut}
                >
                    <AntDesign name="logout" size={24} color={colors.gray} style={{ marginRight: 10 }} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    useLayoutEffect(() => {

        const collectionRef = collection(firestoreDB, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, querySnapshot => {
            // console.log('querySnapshot unsusbscribe');
            // console.log(auth.currentUser)
            setMessages(
                querySnapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
            );
        });
        return unsubscribe;
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages)
        );
        // setMessages([...messages, ...messages]);
        const { _id, createdAt, text, user } = messages[0];
        addDoc(collection(firestoreDB, 'chats'), {
            _id,
            createdAt,
            text,
            user
        });
    }, []);

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View style={{ flexDirection: 'row' }}>
                    <Icon
                        type="font-awesome"
                        name="paperclip"
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{
                            marginBottom: 10,
                            marginRight: 10,
                            transform: [{ rotateY: '180deg' }],
                        }}
                        size={25}
                        color='blue'
                        tvParallaxProperties={undefined}
                    />
                    <Icon
                        type="font-awesome"
                        name="send"
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{ marginBottom: 10, marginRight: 10 }}
                        size={25}
                        color='blue'
                        tvParallaxProperties={undefined}
                    />
                </View>
            </Send>
        );
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#2e64e5',
                    },
                    left: {
                        backgroundColor: '#fff',
                    },
                }}
                textStyle={{
                    right: {
                        color: '#fff',
                    },
                    left: {
                        color: '#000',
                    },
                }}
            />
        );
    };

    const scrollToBottomComponent = () => {
        return <FontAwesome name="angle-double-down" size={22} color="#333" />;
    };

    return (
        // <>
        //   {messages.map(message => (
        //     <Text key={message._id}>{message.text}</Text>
        //   ))}
        // </>
        <View style={{
            flex: 1,
            backgroundColor: '#DCFFB7',
        }}>
            <GiftedChat
                messages={messages}
                showAvatarForEveryMessage={true}
                showUserAvatar={false}
                onSend={messages => onSend(messages)}
                messagesContainerStyle={{
                    backgroundColor: '#DCFFB7'
                }}
                renderBubble={renderBubble}
                alwaysShowSend
                renderSend={renderSend}
                scrollToBottom
                scrollToBottomComponent={scrollToBottomComponent}
                // textInputStyle={{
                //     backgroundColor: '#DCFFB7'
                //     ,
                // }}

                user={{
                    _id: auth?.currentUser?.uid,
                    avatar: userInfo.photoURL
                }}
            />
        </View>
    );
}
