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
  return waterEventsRef.where('userUID', '==', userUID).onSnapshot(callback);
};
