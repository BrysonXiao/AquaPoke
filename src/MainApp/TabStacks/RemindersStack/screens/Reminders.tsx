import React from 'react';
import {Button, Text} from 'react-native';
import {Center} from '../../../../components/Center';
import {RemindersStackNavProps} from '../RemindersParamList';

export const Reminders: React.FC<RemindersStackNavProps<'Reminders'>> = ({
  navigation,
}) => {
  return (
    <Center>
      <Text>Reminders</Text>
      <Button
        title="Go to chat"
        onPress={() => {
          navigation.navigate('Chat');
        }}
      />
    </Center>
  );
};
