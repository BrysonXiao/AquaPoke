import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {AuthContext} from '../../../Authentication/AuthProvider';
import {ProfileParamList} from './ProfileParamList';
import {Profile} from './screens/Profile';
import {Settings} from './screens/Settings';

interface ProfileStackProps {}

const Stack = createStackNavigator<ProfileParamList>();

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
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingRight: 8,
  },
});
