import React, {useContext, useState} from 'react';
import {Text, Button, TextInput} from 'react-native';
import {AuthContext} from '../../Authentication/AuthProvider';
import {Center} from '../../components/Center';
import {checkUsername} from '../../firebase/Firestore';

export const Setup: React.FC = ({}) => {
  const {finishSetup} = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [valid, setValid] = useState(false);

  const handleUsernameChange = async (newUsername: string) => {
    setUsername(newUsername);
    setMessage('');

    // Checking if possible username
    if (newUsername.length > 30) {
      setMessage(_ => 'Username must be less than 30 characters');
      setValid(false);
      return;
    } else if (newUsername.length === 0) {
      setMessage(_ => 'Must enter an username');
      setValid(false);
      return;
    } else if (newUsername.length === 1 && /[0-9]/.test(newUsername[0])) {
      setMessage(_ => 'Username must be more than one number.');
      setValid(false);
      return;
    } else if (!/[a-zA-Z0-9]/.test(newUsername[0])) {
      setMessage(_ => 'First character must be a letter or number');
      setValid(false);
      return;
    } else {
      for (let char of newUsername) {
        if (!/[a0-9A-Za-z_.]/.test(char)) {
          setMessage(
            _ =>
              'Usernames can only have letters, numbers, periods, and underscores',
          );
          setValid(false);
          return;
        }
      }
    }

    setValid(true);

    // // Check if username was taken
    // console.log(`${newUsername} send`);
    // lastSentUsername = newUsername;
    // const usernameExists = await checkUsername(newUsername.toLowerCase());
    // if (usernameExists) {
    //   setMessage(_ => 'Username is taken');
    //   setValid(false);
    //   return;
    // }
    // if (newUsername === lastSentUsername) {
    //   console.log(`${newUsername} updated`);
    //   setMessage(_ => `${newUsername} is available!`);
    //   setValid(true);
    // }
    // console.log(`${newUsername} back`);
  };

  const setupUsername = async () => {
    const usernameExists = await checkUsername(username.toLowerCase());
    if (usernameExists) {
      setMessage(_ => `${username} is taken`);
    } else {
      setMessage(_ => `${username} is available!`);
    }
  };

  return (
    <Center>
      <Text>Set Username</Text>
      <TextInput
        placeholder="Select username"
        value={username}
        onChangeText={handleUsernameChange}
      />
      {message.length > 0 && <Text>{message}</Text>}
      <Button title="Setup" onPress={setupUsername} />
      <Button title="Finish Setup" onPress={finishSetup} />
      {valid && <Text>Username is valid</Text>}
    </Center>
  );
};
