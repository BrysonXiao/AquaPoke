import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type StatsParamList = {
  Overview: undefined;
  HistoricDay: undefined;
};

export type StatsStackNavProps<T extends keyof StatsParamList> = {
  navigation: StackNavigationProp<StatsParamList, T>;
  route: RouteProp<StatsParamList, T>;
};
