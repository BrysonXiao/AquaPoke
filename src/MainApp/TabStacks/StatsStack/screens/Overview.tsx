import React from 'react';
import {Button, Text} from 'react-native';
import {Center} from '../../../../components/Center';
import {StatsStackNavProps} from '../StatsParamList';

export const Overview: React.FC<StatsStackNavProps<'Overview'>> = ({
  navigation,
}) => {
  return (
    <Center>
      <Text>Overview</Text>
      <Button
        title="Go to historic day"
        onPress={() => {
          navigation.navigate('HistoricDay');
        }}
      />
    </Center>
  );
};
