import React, {useContext, useEffect, useRef, useState} from 'react';
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
  const mountedRef = useRef(true);

  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        const fetchResult = await getUsernameFromUID(user.uid);
        if (fetchResult && mountedRef.current) {
          setUsername(fetchResult);
        }
      }
    };
    if (user) {
      fetchUsername();
    }
    return () => {
      mountedRef.current = false;
    };
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
