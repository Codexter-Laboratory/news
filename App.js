import React, {useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {Home} from './src/screens/HomeScreen';
import {Headlines} from './src/screens/HeadlineScreen';
import {History} from './src/screens/History';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Sources} from './src/screens/Sources';
import {SourceHeadlines} from './src/screens/SourceHeadlines';
import {Header} from './src/components/Header';

const HomeStackNav = createNativeStackNavigator();
const homeIcon = require('./assets/images/home.png');
const activeHome = require('./assets/images/activeHome.png');
const sourceIcon = require('./assets/images/sources.png');
const activeSources = require('./assets/images/activeSources.png');
const history = require('./assets/images/history.png');
const activeHistory = require('./assets/images/activeHistory.png');
const HomeStack = () => {
  return (
    <HomeStackNav.Navigator>
      <HomeStackNav.Screen
        name="HomeScreen"
        component={Home}
        options={{headerShown: false}}
      />
      <HomeStackNav.Screen
        name="Headlines"
        component={Headlines}
        options={{
          headerShown: false,
        }}
      />
      <HomeStackNav.Screen
        name="SourceHeadlines"
        component={SourceHeadlines}
        options={{
          headerShown: false,
        }}
      />
      <HomeStackNav.Screen
        name="History"
        component={History}
        options={{
          headerShown: false,
        }}
      />
    </HomeStackNav.Navigator>
  );
};

const TabNavigator = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        backBehavior="none"
        initialRouteName="HomeScreen"
        screenOptions={({route}) => ({
          drawerStyle: {opacity: 1, backgroundColor: '#0E0E0E', width: '60%'},
          drawerActiveTintColor: '#2446ff',
          drawerInactiveTintColor: 'white',
          drawerContentContainerStyle: {marginTop: 20},
          drawerLabelStyle: {alignSelf: 'center'},
        })}>
        <Drawer.Screen
          name="Home"
          component={HomeStack}
          options={{
            headerShown: true,
            header: () => {
              return <Header title={"Today's Picks"} />;
            },
            drawerActiveTintColor: '#2446ff',
            drawerInactiveTintColor: 'white',
            // drawerIcon: ({focused, color, size}) => {
            //   return (
            //     <View style={styles.imageContainer}>
            //       {focused ? (
            //         <Image style={styles.image} source={activeHome} />
            //       ) : (
            //         <Image style={styles.image} source={homeIcon} />
            //       )}
            //     </View>
            //   );
            // },
          }}
        />
        <Drawer.Screen
          name="Sources"
          component={Sources}
          options={{
            headerShown: true,
            header: () => {
              return <Header title={'Sources'} />;
            },
            // drawerIcon: ({focused, color, size}) => {
            //   return (
            //     <View style={styles.imageContainer}>
            //       {focused ? (
            //         <Image style={styles.image} source={activeSources} />
            //       ) : (
            //         <Image style={styles.image} source={sourceIcon} />
            //       )}
            //     </View>
            //   );
            // },
          }}
        />
        <Drawer.Screen
          name="History"
          component={History}
          options={{
            headerShown: true,
            header: () => {
              return <Header title={'History'} />;
            },
            // drawerIcon: ({focused, color, size}) => {
            //   return (
            //     <View style={styles.imageContainer}>
            //       {focused ? (
            //         <Image style={styles.image} source={activeHistory} />
            //       ) : (
            //         <Image style={styles.image} source={history} />
            //       )}
            //     </View>
            //   );
            // },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default App;

const styles = StyleSheet.create({
  imageContainer: {
    width: '50%',
    height: '20%',
    paddingTop: 5,
  },
  image: {
    width: '40%',
    height: '100 %',
    resizeMode: 'stretch',
  },
});
