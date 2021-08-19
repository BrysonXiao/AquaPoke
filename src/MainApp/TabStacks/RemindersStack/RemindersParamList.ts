import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RemindersParamList = {
  Reminders: undefined;
  Chat: undefined;
};

export type RemindersStackNavProps<T extends keyof RemindersParamList> = {
  navigation: StackNavigationProp<RemindersParamList, T>;
  route: RouteProp<RemindersParamList, T>;
};
