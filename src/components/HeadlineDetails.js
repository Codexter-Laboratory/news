import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

export const Details = props => {
  return (
    <View style={{display: 'flex', flexDirection: 'column'}}>
      <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          {props.author ? (
            <Text style={styles.author}>BY {props.author.toUpperCase()}</Text>
          ) : null}
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={styles.dateTime}>{props.dateTime} /</Text>
            {props.source ? (
              <Text style={styles.source}>{props.source}</Text>
            ) : null}
          </View>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '80%',
          backgroundColor: '#0E0E0E',
        }}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: `${props.icon}`}} />
        </View>
        <View>
          <Text style={styles.description}>{props.description}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0E0E0E',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  imageContainer: {
    width: '100%',
    height: '40%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '10%',
    marginLeft: '5%',
    marginRight: '5%',
    paddingBottom: '10%',
    color: '#e7e7e7',
    borderBottomWidth: 2,
    borderBottomColor: '#414141',
  },
  source: {
    color: '#E7E7E7',
    opacity: 0.5,
  },
  author: {
    fontSize: 12,
    color: '#E7E7E7',
    marginLeft: '5%',
    marginRight: '5%',
    opacity: 0.8,
  },
  description: {
    color: '#ffffff',
    marginLeft: '5%',
    marginRight: '5%',
  },
  dateTime: {
    fontSize: 12,
    color: '#E7E7E7',
    opacity: 0.5,
    marginLeft: '5%',
    marginRight: '2%',
    paddingBottom: '5%',
  },
});
