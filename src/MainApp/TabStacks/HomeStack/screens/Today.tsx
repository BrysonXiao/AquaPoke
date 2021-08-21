import React, {useContext, useEffect, useState} from 'react';
import {Button, Text, FlatList, View} from 'react-native';
import {AuthContext} from '../../../../Authentication/AuthProvider';
import {Center} from '../../../../components/Center';
import {HomeStackNavProps} from '../HomeParamList';
import {
  waterEventsRef,
  streamWaterEventsByUserUID,
} from '../../../../firebase/Firestore';
import {
  firebase,
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

// type UserEvent = Event & {UserId: string}
// for extending later on

export const Today: React.FC<HomeStackNavProps<'Today'>> = ({navigation}) => {
  const {user} = useContext(AuthContext);

  const [waterEvents, setWaterEvents] = useState<
    FirebaseFirestoreTypes.DocumentData[]
  >([]);

  useEffect(() => {
    if (user) {
      const unsubscribe = streamWaterEventsByUserUID(
        user.uid,
        querySnapshot => {
          const updatedWaterEventItems = querySnapshot.docs.map(docSnapshot => {
            return {
              key: docSnapshot.id,
              ...docSnapshot.data(),
            };
          });
          setWaterEvents(updatedWaterEventItems);
        },
      );
      return unsubscribe;
    }
    return () => {};
  }, [user]);

  return (
    <Center>
      <Text>Today</Text>
      <Text>{user?.email}</Text>
      <Text>{user?.displayName}</Text>
      <Text>{user?.uid}</Text>
      <Button
        title="Record water"
        onPress={() => {
          navigation.navigate('Record');
        }}
      />
      <Button
        title="Sample Record water"
        onPress={() => {
          if (user) {
            // Create a sample water event entry
            const {serverTimestamp} = firebase.firestore.FieldValue;

            waterEventsRef.add({
              userUID: user.uid,
              createdAt: serverTimestamp(),
              name: 'Sample water event',
              waterIcon: 0,
              amountLiters: 0.5,
            });
          }
        }}
      />
      <FlatList
        data={waterEvents}
        renderItem={({item}) => (
          <View key={item.key}>
            <Text>Key: {item.key}</Text>
            <Text>User UID: {item.userUID}</Text>
            <Text>
              Time:{' '}
              {item.createdAt
                ? item.createdAt.toDate().toString()
                : 'Timestamp not yet set'}
            </Text>
            <Text>Water Icon: {item.waterIcon}</Text>
            <Text>Name: {item.name}</Text>
            <Text>Amount(L): {item.amountLiters}</Text>
            <Text>----------------</Text>
          </View>
        )}
      />
    </Center>
  );
};
