// import React from 'react';
// import {Text, View, Button} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {StackNavigationProp} from '@react-navigation/stack';

// type RootTabParamList = {
//   HomeStack: undefined;
//   SettingsStack: undefined;
// };

// type HomeStackParamList = {
//   Home: undefined;
//   Details: undefined;
// };

// type SettingsStackParamList = {
//   Settings: undefined;
//   Details: undefined;
// };

// type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;

// type HomeScreenProps = {
//   navigation: HomeScreenNavigationProp;
// };

// type SettingsScreenNavigationProp = StackNavigationProp<
//   SettingsStackParamList,
//   'Settings'
// >;

// type SettingsScreenProps = {
//   navigation: SettingsScreenNavigationProp;
// };

// function DetailsScreen() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Details!</Text>
//     </View>
//   );
// }

// function HomeScreen({navigation}: HomeScreenProps) {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Home screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Details')}
//       />
//     </View>
//   );
// }

// function SettingsScreen({navigation}: SettingsScreenProps) {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Settings screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Details')}
//       />
//     </View>
//   );
// }

// const HomeStack = createNativeStackNavigator<HomeStackParamList>();

// function HomeStackScreen() {
//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen name="Home" component={HomeScreen} />
//       <HomeStack.Screen name="Details" component={DetailsScreen} />
//     </HomeStack.Navigator>
//   );
// }

// const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

// function SettingsStackScreen() {
//   return (
//     <SettingsStack.Navigator>
//       <SettingsStack.Screen name="Settings" component={SettingsScreen} />
//       <SettingsStack.Screen name="Details" component={DetailsScreen} />
//     </SettingsStack.Navigator>
//   );
// }

// const Tab = createBottomTabNavigator<RootTabParamList>();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({route}) => ({
//           tabBarIcon: ({focused, color, size}) => {
//             let iconName: string;

//             if (route.name === 'HomeStack') {
//               iconName = focused
//                 ? 'ios-information-circle'
//                 : 'ios-information-circle-outline';
//             } else if (route.name === 'SettingsStack') {
//               iconName = focused ? 'ios-list-sharp' : 'ios-list-outline';
//             } else {
//               iconName = '';
//             }

//             // You can return any component that you like here!
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: 'tomato',
//           tabBarInactiveTintColor: 'gray',
//         })}>
//         <Tab.Screen name="HomeStack" component={HomeStackScreen} />
//         <Tab.Screen name="SettingsStack" component={SettingsStackScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

import {Providers} from './src/Providers';

export default Providers;
