import React, {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {checkUserSetup} from '../firebase/Firestore';

GoogleSignin.configure({
  webClientId:
    '931657969351-5a77vak65clu8nel9jvpuj8as5nu6l4d.apps.googleusercontent.com',
});

// We'll see what the user that gets returned is
type User = FirebaseAuthTypes.User | null;

// eslint-disable-next-line no-spaced-func
export const AuthContext = React.createContext<{
  user: User;
  login: () => void;
  logout: () => void;
  googleSignIn: () => Promise<FirebaseAuthTypes.UserCredential> | Promise<void>;
  initializing: boolean;
  isSetup: boolean;
  finishSetup: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
  googleSignIn: async () => {},
  initializing: true,
  isSetup: false,
  finishSetup: () => {},
});

interface AuthProviderProps {}

// Access the current user anywhere in the application
export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User>(null);
  const [initializing, setInitializing] = useState(true);
  const [isSetup, setIsSetup] = useState(false);

  // Handle user state changes
  async function onAuthStateChanged(userState: User) {
    setUser(userState);
    if (initializing) {
      setInitializing(false);
    }

    // On log in
    if (userState) {
      setInitializing(true);
      setIsSetup(await checkUserSetup(userState.uid));
      setInitializing(false);
    }
  }

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);
    return unsubscribe; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login: () => {
          // Usually some API call
          // const fakeUser = {username: 'bob'};
          // setUser(fakeUser);
          // AsyncStorage.setItem('user', JSON.stringify(fakeUser));
          // Do I just have to log in and then the onAuthStateChanged will get triggered and then set user?
        },
        logout: () => {
          auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        },
        googleSignIn: async () => {
          // Get the users ID token
          const {idToken} = await GoogleSignin.signIn();

          // Create a Google credential with the token
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);

          // Sign-in the user with the credential
          return auth().signInWithCredential(googleCredential);
        },
        initializing,
        isSetup,
        finishSetup: () => {
          setIsSetup(true);
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
