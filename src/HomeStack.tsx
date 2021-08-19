import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Center} from './Center';
import {Button, Text} from 'react-native';
import {HomeParamList, HomeStackNavProps} from './HomeParamList';

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();

function Today({navigation}: HomeStackNavProps<'Today'>) {
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
}

function Record({navigation}: HomeStackNavProps<'Record'>) {
  return (
    <Center>
      <Text>Recording water</Text>
      <Button
        title="Done"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </Center>
  );
}

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Today" component={Today} />
      <Stack.Screen name="Record" component={Record} />
    </Stack.Navigator>
  );
};
