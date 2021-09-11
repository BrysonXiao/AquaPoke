import firestore, {
  FirebaseFirestoreTypes,
  firebase,
} from '@react-native-firebase/firestore';

// Types
// export type WaterEvent = {
//   userUID: string;
//   createdAt: FirebaseFirestoreTypes.Timestamp;
//   name: string;
//   waterIcon: number;
//   amountLiters: number;
// };
export enum AddRequestCode {
  Success, // Send: Successfully sent friend request
  AcceptedRequest, // No send: If sent request to someone who requested you, then accept
  AlreadySent, // No send: Request already exists
  AlreadyFriends, // No send: Already friends
  Error, // No send: Error
}

export enum AcceptRequestCode {
  Success,
  ErrorDeletingRequest,
  Error,
}

export const waterEventsRef = firestore().collection('waterEvents');
export const usersRef = firestore().collection('users');
export const friendRequestsRef = firestore().collection('friendRequests');

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

export const checkUsername = async (username: string) => {
  const userQuerySnapshot = await usersRef
    .where('username', '==', username.toLowerCase())
    .get();
  return !userQuerySnapshot.empty;
};

export const addUsername = async (userUID: string, username: string) => {
  try {
    usersRef.doc(userUID).set({
      username: username.toLowerCase(),
      friends: [],
      blocked: [],
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const getUsernameFromUID = async (
  userUID: string,
): Promise<string | undefined> => {
  try {
    const userDocSnapshot = await usersRef.doc(userUID).get();
    if (userDocSnapshot.exists) {
      return userDocSnapshot.get('username') as string | undefined;
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
};

export const getUserUIDFromUsername = async (
  username: string,
): Promise<string | undefined> => {
  try {
    const userQuerySnapshot = await usersRef
      .where('username', '==', username.toLowerCase())
      .get();
    if (!userQuerySnapshot.empty) {
      return userQuerySnapshot.docs[0].id;
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
};

export const checkIfFriends = async (
  userUID: string,
  friendUID: string,
): Promise<boolean | undefined> => {
  try {
    const userDocSnapshot = await usersRef.doc(userUID).get();
    if (userDocSnapshot.exists) {
      const userFriends = userDocSnapshot.get('friends') as
        | [string]
        | undefined;
      if (userFriends !== undefined) {
        return userFriends.includes(friendUID);
      }
      return undefined;
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
};

// Friend Requests Utilities
export const addRequest = async (
  fromUID: string,
  toUID: string,
): Promise<AddRequestCode> => {
  // Check if request already exists
  const sameRequestQuerySnapshot = await getRequestQuerySnapshotFromUID(
    fromUID,
    toUID,
  );
  if (!sameRequestQuerySnapshot.empty) {
    return AddRequestCode.AlreadySent;
  }

  // Check if opposite request exists, then accept friend request instead of sending another
  const oppositeRequestQuerySnapshot = await getRequestQuerySnapshotFromUID(
    toUID,
    fromUID,
  );
  if (!oppositeRequestQuerySnapshot.empty) {
    // Accept request
    const requestID = oppositeRequestQuerySnapshot.docs[0].id;
    const acceptStatus = await acceptFriendRequestByID(requestID);
    if (acceptStatus) {
      return AddRequestCode.AcceptedRequest;
    } else {
      return AddRequestCode.Error;
    }
  }

  // Check if already friends
  const friendCheck = await checkIfFriends(fromUID, toUID);
  if (friendCheck !== undefined) {
    if (friendCheck) {
      return AddRequestCode.AlreadyFriends;
    }
  } else {
    return AddRequestCode.Error;
  }

  const {serverTimestamp} = firebase.firestore.FieldValue;

  friendRequestsRef.add({
    fromUID: fromUID,
    toUID: toUID,
    createdAt: serverTimestamp(),
  });

  return 1;
};

export const getRequestQuerySnapshotFromUID = async (
  fromUID: string,
  toUID: string,
) => {
  const requestQuerySnapshot = await friendRequestsRef
    .where('fromUID', '==', fromUID)
    .where('toUID', '==', toUID)
    .get();
  return requestQuerySnapshot;
};

export const streamIncomingRequestsUID = (
  userUID: string,
  callback: (querySnapshot: FirebaseFirestoreTypes.QuerySnapshot) => void,
) => {
  return friendRequestsRef
    .where('toUID', '==', userUID)
    .orderBy('createdAt', 'desc')
    .onSnapshot(callback);
};

export const streamOutgoingRequestsUID = (
  userUID: string,
  callback: (querySnapshot: FirebaseFirestoreTypes.QuerySnapshot) => void,
) => {
  return friendRequestsRef
    .where('fromUID', '==', userUID)
    .orderBy('createdAt', 'desc')
    .onSnapshot(callback);
};

export const acceptFriendRequestByID = async (
  requestID: string,
): Promise<AcceptRequestCode> => {
  // FOR FUTURE: Feels a little redundant, maybe just take document
  const requestDocSnapshot = await friendRequestsRef.doc(requestID).get();
  if (requestDocSnapshot.exists) {
    const fromUID = requestDocSnapshot.get('fromUID') as string | undefined;
    const toUID = requestDocSnapshot.get('toUID') as string | undefined;
    if (fromUID !== undefined && toUID !== undefined) {
      addFriend(fromUID, toUID);
      addFriend(toUID, fromUID);
      // Delete this request
      friendRequestsRef
        .doc(requestID)
        .delete()
        .then(() => {
          return AcceptRequestCode.Success;
        })
        .catch(_ => {
          return AcceptRequestCode.ErrorDeletingRequest;
        });
    }
  }
  return AcceptRequestCode.Error;
};

const addFriend = async (userUID: string, friendUID: string) => {
  // Assuming userUID and friendUID exists
  usersRef.doc(userUID).update({
    friends: firebase.firestore.FieldValue.arrayUnion(friendUID),
  });
};
