import React from 'react';
import {Button, Text} from 'react-native';
import {Center} from '../../../../components/Center';
import {HomeStackNavProps} from '../HomeParamList';

export const Record: React.FC<HomeStackNavProps<'Record'>> = ({navigation}) => {
  return (
    <Center>
      <Text>Recording water</Text>
      <Button
        title="Done"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </Center>
  );
};
