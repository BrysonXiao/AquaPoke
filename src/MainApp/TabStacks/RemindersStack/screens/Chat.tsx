import React, {useContext, useEffect, useState} from 'react';
import {Button, Text, TextInput, FlatList, View} from 'react-native';
import {Center} from '../../../../components/Center';
import {RemindersStackNavProps} from '../RemindersParamList';
import {
  addMessage,
  streamReceivedMessagesByUserUIDs,
  streamSentMessagesByUserUIDs,
} from '../../../../firebase/Firestore';
import {AuthContext} from '../../../../Authentication/AuthProvider';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export const Chat: React.FC<RemindersStackNavProps<'Chat'>> = ({
  navigation,
  route,
}) => {
  const {user} = useContext(AuthContext);
  const friendUID = route.params.friendUID;

  const [message, setMessage] = useState('');
  const [sentMessages, setSentMessages] = useState<
    FirebaseFirestoreTypes.DocumentData[]
  >([]);
  const [receivedMessages, setReceivedMessages] = useState<
    FirebaseFirestoreTypes.DocumentData[]
  >([]);

  useEffect(() => {
    if (user) {
      // If compound like this, then need to create composite index in firestore
      const unsubscribeSent = streamSentMessagesByUserUIDs(
        user.uid,
        friendUID,
        querySnapshot => {
          const updatedSentMessages = querySnapshot.docs.map(docSnapshot => {
            return {
              key: docSnapshot.id,
              ...docSnapshot.data(),
            };
          });
          setSentMessages(updatedSentMessages);
        },
      );

      const unsubscribeReceived = streamReceivedMessagesByUserUIDs(
        user.uid,
        friendUID,
        querySnapshot => {
          const updatedReceivedMessages = querySnapshot.docs.map(
            docSnapshot => {
              return {
                key: docSnapshot.id,
                ...docSnapshot.data(),
              };
            },
          );
          setReceivedMessages(updatedReceivedMessages);
        },
      );

      return () => {
        unsubscribeSent();
        unsubscribeReceived();
      };
    }
    return () => {};
  }, [user, friendUID]);

  const handleSend = async () => {
    if (user) {
      await addMessage(user.uid, friendUID, message);
      setMessage('');
    }
  };

  return (
    <Center>
      <Text>Chatting with {friendUID}</Text>
      <Button
        title="Go to reminders"
        onPress={() => {
          navigation.navigate('Reminders');
        }}
      />
      <TextInput placeholder="Chat" value={message} onChangeText={setMessage} />
      <Button title="Send" onPress={handleSend} />
      <Text>Sent Messages</Text>
      <FlatList
        data={sentMessages}
        renderItem={({item}) => (
          <View key={item.key}>
            <Text>Key: {item.key}</Text>
            <Text>From UID: {item.fromUID}</Text>
            <Text>To UID: {item.toUID}</Text>
            <Text>
              Time:{' '}
              {item.createdAt
                ? item.createdAt.toDate().toString()
                : 'Timestamp not yet set'}
            </Text>
            <Text>Message: {item.message}</Text>
            <Text>----------------</Text>
          </View>
        )}
      />
      <Text>Received Messages</Text>
      <FlatList
        data={receivedMessages}
        renderItem={({item}) => (
          <View key={item.key}>
            <Text>Key: {item.key}</Text>
            <Text>From UID: {item.fromUID}</Text>
            <Text>To UID: {item.toUID}</Text>
            <Text>
              Time:{' '}
              {item.createdAt
                ? item.createdAt.toDate().toString()
                : 'Timestamp not yet set'}
            </Text>
            <Text>Message: {item.message}</Text>
            <Text>----------------</Text>
          </View>
        )}
      />
    </Center>
  );
};
