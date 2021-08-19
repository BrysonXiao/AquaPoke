import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Center} from '../../../components/Center';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {AuthContext} from '../../../Authentication/AuthProvider';

interface ProfileStackProps {}

const Stack = createStackNavigator();

function Profile() {
  return (
    <Center>
      <Text>Profile</Text>
    </Center>
  );
}

export const ProfileStack: React.FC<ProfileStackProps> = ({}) => {
  const {logout} = useContext(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}>
                <Icon
                  type="ionicon"
                  name="exit-outline"
                  containerStyle={styles.icon}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingRight: 8,
  },
});
