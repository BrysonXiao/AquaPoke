import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  Button,
  FlatList,
  View,
} from 'react-native';
import {AuthContext} from '../../../../../Authentication/AuthProvider';
import {
  acceptFriendRequestByID,
  addRequest,
  getUserUIDFromUsername,
  streamIncomingRequestsUID,
  streamOutgoingRequestsUID,
  AddRequestCode,
} from '../../../../../firebase/Firestore';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

interface RequestsProps {}

export const Requests: React.FC<RequestsProps> = ({}) => {
  const {user} = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [valid, setValid] = useState(false);
  const [incomingRequests, setIncomingRequests] = useState<
    FirebaseFirestoreTypes.DocumentData[]
  >([]);
  const [outgoingRequests, setOutgoingRequests] = useState<
    FirebaseFirestoreTypes.DocumentData[]
  >([]);

  useEffect(() => {
    if (user) {
      // If compound like this, then need to create composite index in firestore
      const unsubscribeIncoming = streamIncomingRequestsUID(
        user.uid,
        querySnapshot => {
          const updatedIncomingRequests = querySnapshot.docs.map(
            docSnapshot => {
              return {
                key: docSnapshot.id,
                ...docSnapshot.data(),
              };
            },
          );
          setIncomingRequests(updatedIncomingRequests);
        },
      );
      const unsubscribeOutgoing = streamOutgoingRequestsUID(
        user.uid,
        querySnapshot => {
          const updatedOutgoingRequests = querySnapshot.docs.map(
            docSnapshot => {
              return {
                key: docSnapshot.id,
                ...docSnapshot.data(),
              };
            },
          );
          setOutgoingRequests(updatedOutgoingRequests);
        },
      );
      return () => {
        unsubscribeIncoming();
        unsubscribeOutgoing();
      };
    }
    return () => {};
  }, [user]);

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
    setMessage('');

    // Checking if possible username
    if (newUsername.length > 30) {
      setMessage(_ => 'Username must be less than 30 characters');
      setValid(false);
      return;
    } else if (newUsername.length === 0) {
      setMessage(_ => 'Must enter an username');
      setValid(false);
      return;
    } else if (newUsername.length === 1 && /[0-9]/.test(newUsername[0])) {
      setMessage(_ => 'Username must be more than one number.');
      setValid(false);
      return;
    } else if (!/[a-zA-Z0-9]/.test(newUsername[0])) {
      setMessage(_ => 'First character must be a letter or number');
      setValid(false);
      return;
    } else {
      for (let char of newUsername) {
        if (!/[a0-9A-Za-z_.]/.test(char)) {
          setMessage(
            _ =>
              'Usernames can only have letters, numbers, periods, and underscores',
          );
          setValid(false);
          return;
        }
      }
    }

    setValid(true);
  };

  const sendFriendRequest = async () => {
    if (valid) {
      // Check for user
      const getUserUID = await getUserUIDFromUsername(username);
      if (getUserUID !== undefined && user) {
        // Check if self's username
        if (user.uid === getUserUID) {
          setMessage('That is you');
          return;
        }
        setMessage('Sending request');
        const successfullySent = await addRequest(user.uid, getUserUID);
        switch (successfullySent) {
          case AddRequestCode.Success:
            setMessage('Request successfully sent');
            break;
          case AddRequestCode.AlreadyFriends:
            setMessage('You are already friends');
            break;
          case AddRequestCode.AcceptedRequest:
            setMessage('You accepted their friend request');
            break;
          case AddRequestCode.AlreadySent:
            setMessage('Request was previously sent');
            break;
          case AddRequestCode.Error:
            setMessage('Something went wrong');
            break;
          default:
            setMessage('Something went wrong');
            break;
        }
      } else {
        setMessage('Username not found');
      }
    }
  };

  const acceptRequest = async (requestID: string) => {
    // Returns a enum
    return await acceptFriendRequestByID(requestID);
  };

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Search username"
        value={username}
        onChangeText={handleUsernameChange}
      />
      {message.length > 0 && <Text>{message}</Text>}
      <Button title="Send Friend Request" onPress={sendFriendRequest} />
      <Text>Incoming Requests</Text>
      <FlatList
        data={incomingRequests}
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
            <Button title="Accept" onPress={() => acceptRequest(item.key)} />
            <Text>----------------</Text>
          </View>
        )}
      />
      <Text>_______________</Text>
      <Text>_______________</Text>
      <Text>Outgoing Requests</Text>
      <FlatList
        data={outgoingRequests}
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
            <Text>----------------</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
