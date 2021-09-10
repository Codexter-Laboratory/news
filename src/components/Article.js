import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export const Article = props => {
  return (
    <TouchableOpacity style={styles.articleContainer} onPress={props.onPress}>
      <Image style={styles.image} source={{uri: `${props.icon}`}} />
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {props.description}
        </Text>
        <Text style={styles.source}>{props.source}</Text>
        <Text style={styles.dateTime}>{props.dateTime}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  articleContainer: {
    elevation: 2,
    margin: '4%',
    backgroundColor: '#313236',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '5%',
    marginBottom: '5%',
    paddingLeft: '3%',
    paddingRight: '3%',
    color: '#e7e7e7',
  },
  desc: {paddingLeft: '3%', paddingRight: '3%', color: '#e7e7e7'},
  source: {
    color: '#1964f8',
    fontWeight: 'bold',
    marginTop: '6%',
    marginBottom: '2%',
    fontSize: 16,
    paddingLeft: '3%',
    paddingRight: '3%',
  },
  dateTime: {
    fontSize: 16,
    color: '#e7e7e7',
    fontWeight: 'bold',
    marginBottom: '5%',
    paddingLeft: '3%',
    paddingRight: '3%',
  },
});
