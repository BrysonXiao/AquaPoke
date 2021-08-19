import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StatsParamList} from './StatsParamList';
import {Overview} from './screens/Overview';
import {HistoricDay} from './screens/HistoricDay';

interface StatsStackProps {}

const Stack = createStackNavigator<StatsParamList>();

export const StatsStack: React.FC<StatsStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Overview" component={Overview} />
      <Stack.Screen name="HistoricDay" component={HistoricDay} />
    </Stack.Navigator>
  );
};
