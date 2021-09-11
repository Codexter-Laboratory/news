import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/core';

const menuIcon = require('../../assets/images/menu.png');
export const Header = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          width: '20%',
          marginRight: 20,
        }}
        onPress={() => navigation.toggleDrawer()}>
        <Image source={menuIcon} style={{width: 20, height: 20}} />
      </TouchableOpacity>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1B1B1B',
    width: '100%',
    height: 80,
    elevation: 5,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#f3f3f3',
    alignSelf: 'center',
  },
});
