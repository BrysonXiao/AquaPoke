import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList, Button} from 'react-native';
import {AuthContext} from '../../../../../Authentication/AuthProvider';
import {Center} from '../../../../../components/Center';
import {
  getUsernameFromUID,
  streamUserByUID,
} from '../../../../../firebase/Firestore';
import {ReminderTabsContext} from './RemindersTabs';
import {RemindersTabsNavProps} from './RemindersTabsParamList';

interface Friend {
  uid: string;
  username: string;
}

export const FriendMessages: React.FC<RemindersTabsNavProps<'FriendMessages'>> =
  () => {
    const {user} = useContext(AuthContext);
    const {stackNavigator} = useContext(ReminderTabsContext);

    const [friends, setFriends] = useState<Friend[]>([]);

    const reminderStackNavigator = stackNavigator;

    useEffect(() => {
      if (user) {
        const unsubscribeUser = streamUserByUID(user.uid, async docSnapshot => {
          if (docSnapshot.exists) {
            const friendList: Friend[] = [];
            const friendIDs = docSnapshot.get('friends') as
              | [string]
              | undefined;
            if (friendIDs !== undefined) {
              for (let friendID of friendIDs) {
                const friendUsername = await getUsernameFromUID(friendID);
                if (friendUsername !== undefined) {
                  friendList.push({
                    uid: friendID,
                    username: friendUsername,
                  });
                }
              }
            }
            setFriends(friendList);
          }
        });
        return () => {
          unsubscribeUser();
        };
      }
      return () => {};
    }, [user]);

    const goChatUID = (friendUID: string) => {
      if (reminderStackNavigator) {
        reminderStackNavigator.navigate('Chat', {friendUID});
      }
    };

    return (
      <Center>
        <FlatList
          data={friends}
          renderItem={({item}) => (
            <View key={item.uid}>
              <Text>{item.uid}</Text>
              <Text>{item.username}</Text>
              <Button title="Chat" onPress={() => goChatUID(item.uid)} />
              <Text>_______________</Text>
            </View>
          )}
        />
      </Center>
    );
  };
