import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export const Tags = props => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={
          props.activeUae || props.activeEgy
            ? styles.button
            : styles.activeButton
        }
        onPress={props.onPressAll}>
        <Text
          style={
            props.activeUae || props.activeEgy
              ? {color: 'white'}
              : {color: 'black'}
          }>
          All News
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={props.activeEgy ? styles.activeButton : styles.button}
        activeOpacity={0.8}
        onPress={props.onPressEgy}>
        <Text style={props.activeEgy ? {color: 'black'} : {color: 'white'}}>
          Egypt
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={props.activeUae ? styles.activeButton : styles.button}
        onPress={props.onPressUae}>
        <Text style={props.activeUae ? {color: 'black'} : {color: 'white'}}>
          UAE
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height: '6%',
    backgroundColor: '#313236',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#1B1B1B',
    borderRadius: 20,
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginLeft: 10,
  },
  activeButton: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 20,
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginLeft: 10,
  },
});
