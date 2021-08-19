import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RemindersParamList} from './RemindersParamList';
import {Reminders} from './screens/Reminders';
import {Chat} from './screens/Chat';

interface RemindersStackProps {}

const Stack = createStackNavigator<RemindersParamList>();

export const RemindersStack: React.FC<RemindersStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Reminders" component={Reminders} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};
