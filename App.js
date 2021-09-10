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
import {Sources} from './src/screens/Sources';
import {SourceHeadlines} from './src/screens/SourceHeadlines';

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
const App = () => {
  return (
    <NavigationContainer>
      <TabNavigator.Navigator
        backBehavior="none"
        screenOptions={({route}) => ({
          tabBarStyle: {borderTopWidth: 0, height: 50, opacity: 1},
          tabBarActiveTintColor: '#2446ff',
          tabBarInactiveTintColor: 'black',
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View style={styles.imageContainer}>
                {route.name === 'Home' ? (
                  focused ? (
                    <Image style={styles.image} source={activeHome} />
                  ) : (
                    <Image style={styles.image} source={homeIcon} />
                  )
                ) : route.name === 'Sources' ? (
                  focused ? (
                    <Image style={styles.image} source={activeSources} />
                  ) : (
                    <Image style={styles.image} source={sourceIcon} />
                  )
                ) : focused ? (
                  <Image style={styles.image} source={activeHistory} />
                ) : (
                  <Image style={styles.image} source={history} />
                )}
              </View>
            );
          },
        })}>
        <TabNavigator.Screen
          name="Home"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarActiveTintColor: '#2446ff',
            tabBarInactiveTintColor: 'black',
            tabBarLabel: ({focused, navigation}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Home'}],
                  });
                }}>
                <Text
                  style={{color: focused ? '#2446ff' : 'black', fontSize: 10}}>
                  Home
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
        <TabNavigator.Screen
          name="Sources"
          component={Sources}
          options={{headerShown: false}}
        />
        <TabNavigator.Screen
          name="History"
          component={History}
          options={{headerShown: false}}
        />
      </TabNavigator.Navigator>
    </NavigationContainer>
  );
};
export default App;

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: '90%',
    paddingTop: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
