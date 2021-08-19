import React from 'react';
import {Button, Text} from 'react-native';
import {Center} from '../../../../components/Center';
import {ProfileStackNavProps} from '../ProfileParamList';

export const Settings: React.FC<ProfileStackNavProps<'Settings'>> = ({
  navigation,
}) => {
  return (
    <Center>
      <Text>Settings</Text>
      <Button
        title="Go to profile"
        onPress={() => {
          navigation.navigate('Profile');
        }}
      />
    </Center>
  );
};
