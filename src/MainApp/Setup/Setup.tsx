import React, {useContext} from 'react';
import {Text, Button} from 'react-native';
import {AuthContext} from '../../Authentication/AuthProvider';
import {Center} from '../../components/Center';

export const Setup: React.FC = ({}) => {
  const {finishSetup} = useContext(AuthContext);

  return (
    <Center>
      <Text>Set Username</Text>
      <Button title="Setup" onPress={finishSetup} />
    </Center>
  );
};
