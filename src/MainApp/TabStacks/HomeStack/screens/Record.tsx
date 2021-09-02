import React, {useContext, useState} from 'react';
import {Button, Text, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Center} from '../../../../components/Center';
import {HomeStackNavProps} from '../HomeParamList';
import {AuthContext} from '../../../../Authentication/AuthProvider';
import {waterEventsRef} from '../../../../firebase/Firestore';
import {firebase} from '@react-native-firebase/firestore';

export const Record: React.FC<HomeStackNavProps<'Record'>> = ({navigation}) => {
  const {user} = useContext(AuthContext);

  const [name, setName] = useState('');
  const [waterIcon, setWaterIcon] = useState(0);
  const [amount, setAmount] = useState('');

  const updateName = (text: string): void => {
    setName(text);
  };

  const waterIconChange = (itemValue: number, itemIndex: number): void => {
    setWaterIcon(itemIndex);
  };

  const updateAmount = (text: string): void => {
    setAmount(text);
  };

  const recordWater = () => {
    if (user) {
      // Create a sample water event entry
      const {serverTimestamp} = firebase.firestore.FieldValue;

      waterEventsRef.add({
        userUID: user.uid,
        createdAt: serverTimestamp(),
        name: name,
        waterIcon: waterIcon,
        amountLiters: parseFloat(amount),
      });
    }
    navigation.goBack();
  };

  return (
    <Center>
      <Text>Recording water</Text>
      <TextInput
        value={name}
        onChangeText={updateName}
        placeholder={'Water event name'}
      />
      <Picker
        selectedValue={waterIcon}
        onValueChange={waterIconChange}
        style={{width: 100}}>
        <Picker.Item label="Small" value={0} />
        <Picker.Item label="Medium" value={1} />
        <Picker.Item label="Large" value={2} />
      </Picker>
      <TextInput
        value={amount}
        keyboardType="decimal-pad"
        onChangeText={updateAmount}
        placeholder={'Amount (L)'}
      />
      <Button title="Done" onPress={recordWater} />
    </Center>
  );
};
