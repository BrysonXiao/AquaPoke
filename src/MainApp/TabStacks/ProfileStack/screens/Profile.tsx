import React from 'react';
import {Button, Text} from 'react-native';
import {Center} from '../../../../components/Center';
import {ProfileStackNavProps} from '../ProfileParamList';

export const Profile: React.FC<ProfileStackNavProps<'Profile'>> = ({
  navigation,
}) => {
  return (
    <Center>
      <Text>Profile</Text>
      <Button
        title="Go to settings"
        onPress={() => {
          navigation.navigate('Settings');
        }}
      />
    </Center>
  );
};
