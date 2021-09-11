import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Center} from './components/Center';
import {ActivityIndicator} from 'react-native';
import {AuthContext} from './Authentication/AuthProvider';
import {AppTabs} from './MainApp/AppTabs';
import {AuthStack} from './Authentication/AuthStack';
import {useColorScheme} from 'react-native';
import {Setup} from './MainApp/Setup/Setup';

interface RoutesProps {}

const LightTheme = {
  dark: false,
  colors: {
    primary: 'white',
    background: 'white',
    card: 'dodgerblue',
    text: 'white',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

const DarkTheme = {
  dark: true,
  colors: {
    primary: 'dodgerblue',
    background: 'rgb(15, 44, 52)',
    card: 'rgb(8, 28, 33)',
    text: 'lightcyan',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

export const Routes: React.FC<RoutesProps> = ({}) => {
  const scheme = useColorScheme();

  // Usually have to do async check to see if user is logged in or not
  const {user, isSetup, initializing} = useContext(AuthContext);

  // Don't really think I need this?
  // useEffect(() => {
  //   // Check if the user is logged in or not
  //   //Async storage may end up being a server call
  //   AsyncStorage.getItem('user')
  //     .then(userString => {
  //       if (userString) {
  //         // decode it
  //         login();
  //       }
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (initializing) {
    // Return loading screen
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    );
  }

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
      {user ? isSetup ? <AppTabs /> : <Setup /> : <AuthStack />}
    </NavigationContainer>
  );
};
