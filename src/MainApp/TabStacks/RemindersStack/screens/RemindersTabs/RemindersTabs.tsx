import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RemindersTabsParamList} from './RemindersTabsParamList';
import {FriendMessages} from './FriendMessages';
import {Requests} from './Requests';
import {
  RemindersParamList,
  RemindersStackNavProps,
} from '../../RemindersParamList';
import {Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

// interface RemindersTabsProps {
//   stackNavigator: StackNavigationProp<RemindersParamList, "Reminders">;
// }

// eslint-disable-next-line no-spaced-func
export const ReminderTabsContext = React.createContext<{
  stackNavigator: StackNavigationProp<RemindersParamList, 'Reminders'> | null;
}>({
  stackNavigator: null,
});

const Tabs = createMaterialTopTabNavigator<RemindersTabsParamList>();

export const RemindersTabs: React.FC<RemindersStackNavProps<'Reminders'>> = ({
  navigation,
}) => {
  return (
    <ReminderTabsContext.Provider
      value={{
        stackNavigator: navigation,
      }}>
      <Text>Header</Text>
      <Tabs.Navigator
        initialRouteName="FriendMessages"
        screenOptions={{
          swipeEnabled: false,
        }}>
        <Tabs.Screen
          name="FriendMessages"
          component={FriendMessages}
          options={{title: 'Friends'}}
          // initialParams={{stackNavigator: navigation}}
        />
        <Tabs.Screen
          name="Requests"
          component={Requests}
          options={{title: 'Requests'}}
        />
      </Tabs.Navigator>
    </ReminderTabsContext.Provider>
  );
};
