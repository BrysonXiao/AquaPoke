import React from 'react';
import {Button, Text} from 'react-native';
import {Center} from '../../../../components/Center';
import {StatsStackNavProps} from '../StatsParamList';

export const HistoricDay: React.FC<StatsStackNavProps<'HistoricDay'>> = ({
  navigation,
}) => {
  return (
    <Center>
      <Text>Historic Day</Text>
      <Button
        title="Go to overview"
        onPress={() => {
          navigation.navigate('Overview');
        }}
      />
    </Center>
  );
};
