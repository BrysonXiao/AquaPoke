import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {Button, Text} from 'react-native';
import {AuthNavProps, AuthParamList} from './AuthParamList';
import {AuthContext} from './AuthProvider';
import {Center} from '../components/Center';

function Login({navigation}: AuthNavProps<'Login'>) {
  const {login} = useContext(AuthContext);
  return (
    <Center>
      <Text>Login Screen</Text>
      <Button
        title="Log me in"
        onPress={() => {
          login();
        }}
      />
      <Button
        title="Go to Register"
        onPress={() => {
          navigation.navigate('Register');
        }}
      />
    </Center>
  );
}

function Register({navigation}: AuthNavProps<'Register'>) {
  return (
    <Center>
      <Text>Register Screen</Text>
      <Button
        title="Go to Login"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
    </Center>
  );
}

interface AuthStackProps {}

const Stack = createStackNavigator<AuthParamList>();

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerTitle: 'Sign In'}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerTitle: 'Sign Up'}}
      />
    </Stack.Navigator>
  );
};
