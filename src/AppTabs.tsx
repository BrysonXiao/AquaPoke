import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppParamList} from './AppParamList';
import {Center} from './Center';
import {Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHandPointRight} from '@fortawesome/free-solid-svg-icons';
import {HomeStack} from './HomeStack';
import {ProfileStack} from './ProfileStack';

function Stats() {
  return (
    <Center>
      <Text>Stats</Text>
    </Center>
  );
}

function Reminders() {
  return (
    <Center>
      <Text>Reminders</Text>
    </Center>
  );
}

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
          } else if (route.name === 'Stats') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'Reminders') {
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
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tabs.Screen
        name="HomeStack"
        component={HomeStack}
        options={{title: 'Home'}}
      />
      <Tabs.Screen name="Stats" component={Stats} />
      <Tabs.Screen name="Reminders" component={Reminders} />
      <Tabs.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{title: 'Profile'}}
      />
    </Tabs.Navigator>
  );
};
