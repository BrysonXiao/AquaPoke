import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import {RouteProp} from '@react-navigation/native';
// import {StackNavigationProp} from '@react-navigation/stack';
// import {RemindersParamList} from '../../RemindersParamList';

export type RemindersTabsParamList = {
  FriendMessages: undefined;
  Requests: undefined;
};

export type RemindersTabsNavProps<T extends keyof RemindersTabsParamList> = {
  navigation: MaterialTopTabNavigationProp<RemindersTabsParamList, T>;
  route: RouteProp<RemindersTabsParamList, T>;
};
