import React from 'react';
import {Text, View} from 'react-native';

interface CenterProps {}

export const Center: React.FC<CenterProps> = ({children}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {children}
    </View>
  );
};
