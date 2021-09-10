import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

// Types
// export type WaterEvent = {
//   userUID: string;
//   createdAt: FirebaseFirestoreTypes.Timestamp;
//   name: string;
//   waterIcon: number;
//   amountLiters: number;
// };

export const waterEventsRef = firestore().collection('waterEvents');
export const usersRef = firestore().collection('users');

// Water Events Utilities
export const getWaterEvents = async () => {
  const waterEventDocument = await waterEventsRef
    .doc('NkZ0EYkc2ke13V4t3bnh')
    .get();
  console.log(waterEventDocument);
};

export const streamWaterEventsByUserUID = (
  userUID: string,
  callback: (querySnapshot: FirebaseFirestoreTypes.QuerySnapshot) => void,
) => {
  return waterEventsRef
    .where('userUID', '==', userUID)
    .orderBy('createdAt', 'desc')
    .onSnapshot(callback);
};

export const waterEventsByUserUID = (userUID: string) => {
  return waterEventsRef
    .where('userUID', '==', userUID)
    .orderBy('createdAt', 'desc');
};

// Users utilities
export const checkUserSetup = async (userUID: string) => {
  const userDoc = await usersRef.doc(userUID).get();
  return userDoc.exists;
};

// Username utilities
export const checkUsername = async (username: string) => {
  const usernameDocSnapshot = await usersRef
    .where('username', '==', username)
    .get();
  return !usernameDocSnapshot.empty;
};
