import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RemindersTabsParamList} from './RemindersTabsParamList';
import {FriendMessages} from './FriendMessages';
import {Requests} from './Requests';
import {RemindersStackNavProps} from '../../RemindersParamList';

// interface RemindersTabsProps {
//   stackNavigator: StackNavigationProp<RemindersParamList, "Reminders">;
// }

const Tabs = createMaterialTopTabNavigator<RemindersTabsParamList>();

export const RemindersTabs: React.FC<RemindersStackNavProps<'Reminders'>> = ({
  navigation,
}) => {
  return (
    <Tabs.Navigator
      initialRouteName="FriendMessages"
      screenOptions={{
        swipeEnabled: false,
      }}>
      <Tabs.Screen
        name="FriendMessages"
        component={FriendMessages}
        options={{title: 'Friends'}}
      />
      <Tabs.Screen
        name="Requests"
        component={Requests}
        options={{title: 'Requests'}}
      />
    </Tabs.Navigator>
  );
};
