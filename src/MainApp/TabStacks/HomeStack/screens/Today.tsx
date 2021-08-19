import React from 'react';
import {Button, Text} from 'react-native';
import {Center} from '../../../../components/Center';
import {HomeStackNavProps} from '../HomeParamList';

// type UserEvent = Event & {UserId: string}
// for extending later on

export const Today: React.FC<HomeStackNavProps<'Today'>> = ({navigation}) => {
  return (
    <Center>
      <Text>Today</Text>
      <Button
        title="Record water"
        onPress={() => {
          navigation.navigate('Record');
        }}
      />
    </Center>
  );
};
