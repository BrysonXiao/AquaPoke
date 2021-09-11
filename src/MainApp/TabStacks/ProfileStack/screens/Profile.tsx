import React, {useContext, useEffect, useState} from 'react';
import {Button, Text} from 'react-native';
import {AuthContext} from '../../../../Authentication/AuthProvider';
import {Center} from '../../../../components/Center';
import {getUsernameFromUID} from '../../../../firebase/Firestore';
import {ProfileStackNavProps} from '../ProfileParamList';

export const Profile: React.FC<ProfileStackNavProps<'Profile'>> = ({
  navigation,
}) => {
  const {user} = useContext(AuthContext);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        const fetchResult = await getUsernameFromUID(user.uid);
        if (fetchResult) {
          setUsername(fetchResult);
        }
      }
    };
    if (user) {
      fetchUsername();
    }
  }, [user]);

  return (
    <Center>
      <Text>Profile</Text>
      <Text>{`Username: ${username}`}</Text>
      <Button
        title="Go to settings"
        onPress={() => {
          navigation.navigate('Settings');
        }}
      />
    </Center>
  );
};
