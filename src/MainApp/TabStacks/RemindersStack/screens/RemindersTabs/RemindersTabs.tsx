import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RemindersTabsParamList} from './RemindersTabsParamList';
import {FriendMessages} from './FriendMessages';
import {Requests} from './Requests';

interface RemindersTabsProps {}

const Tabs = createMaterialTopTabNavigator<RemindersTabsParamList>();

export const RemindersTabs: React.FC<RemindersTabsProps> = ({}) => {
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
