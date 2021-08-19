import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeParamList} from './HomeParamList';
import {Today} from './screens/Today';
import {Record} from './screens/Record';

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Today" component={Today} />
      <Stack.Screen name="Record" component={Record} />
    </Stack.Navigator>
  );
};
