import React from 'react';
import {Button, Text} from 'react-native';
import {Center} from '../../../../components/Center';
import {RemindersStackNavProps} from '../RemindersParamList';

export const Chat: React.FC<RemindersStackNavProps<'Chat'>> = ({
  navigation,
  route,
}) => {
  const friendUID = route.params.friendUID;
  return (
    <Center>
      <Text>Chatting with {friendUID}</Text>
      <Button
        title="Go to reminders"
        onPress={() => {
          navigation.navigate('Reminders');
        }}
      />
    </Center>
  );
};
