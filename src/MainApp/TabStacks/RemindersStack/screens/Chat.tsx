import React from 'react';
import {Button, Text} from 'react-native';
import {Center} from '../../../../components/Center';
import {RemindersStackNavProps} from '../RemindersParamList';

export const Chat: React.FC<RemindersStackNavProps<'Chat'>> = ({
  navigation,
}) => {
  return (
    <Center>
      <Text>Chat</Text>
      <Button
        title="Go to reminders"
        onPress={() => {
          navigation.navigate('Reminders');
        }}
      />
    </Center>
  );
};
