import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Center} from './components/Center';
import {ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './Authentication/AuthProvider';
import {AppTabs} from './MainApp/AppTabs';
import {AuthStack} from './Authentication/AuthStack';

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  // Usually have to do async check to see if user is logged in or not
  const {user, login} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is logged in or not
    //Async storage may end up being a server call
    AsyncStorage.getItem('user')
      .then(userString => {
        if (userString) {
          // decode it
          login();
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    // Return loading screen
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
