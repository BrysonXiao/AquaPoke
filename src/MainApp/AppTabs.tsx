import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppParamList} from './AppParamList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHandPointRight} from '@fortawesome/free-solid-svg-icons';
import {HomeStack} from './TabStacks/HomeStack/HomeStack';
import {ProfileStack} from './TabStacks/ProfileStack/ProfileStack';
import {StatsStack} from './TabStacks/StatsStack/StatsStack';
import {RemindersStack} from './TabStacks/RemindersStack/RemindersStack';

interface AppTabsProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
  return (
    <Tabs.Navigator
      initialRouteName="HomeStack"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          if (route.name === 'HomeStack') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'StatsStack') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'RemindersStack') {
            return focused ? (
              <FontAwesomeIcon
                icon={faHandPointRight}
                size={size}
                color={color}
              />
            ) : (
              <FontAwesome name={'hand-o-right'} size={size} color={color} />
            );
          } else if (route.name === 'ProfileStack') {
            iconName = focused ? 'user' : 'user-o';
            return <FontAwesome name={iconName} size={size} color={color} />;
          } else {
            iconName = '';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // tabBarActiveTintColor: 'dodgerblue',
        // tabBarInactiveTintColor: 'dodgerblue',
        // tabBarStyle: {backgroundColor: 'lightcyan'},
        headerShown: false,
      })}>
      <Tabs.Screen
        name="HomeStack"
        component={HomeStack}
        options={{title: 'Home'}}
      />
      <Tabs.Screen
        name="StatsStack"
        component={StatsStack}
        options={{title: 'Stats'}}
      />
      <Tabs.Screen
        name="RemindersStack"
        component={RemindersStack}
        options={{title: 'Reminders'}}
      />
      <Tabs.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{title: 'Profile'}}
      />
    </Tabs.Navigator>
  );
};
