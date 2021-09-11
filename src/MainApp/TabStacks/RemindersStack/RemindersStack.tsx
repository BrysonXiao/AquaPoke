import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RemindersParamList} from './RemindersParamList';
import {Chat} from './screens/Chat';
import {RemindersTabs} from './screens/RemindersTabs/RemindersTabs';

interface RemindersStackProps {}

const Stack = createStackNavigator<RemindersParamList>();

export const RemindersStack: React.FC<RemindersStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Reminders" component={RemindersTabs} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};
