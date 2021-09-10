import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Details} from '../components/HeadlineDetails';
import moment from 'moment';

export const Headlines = ({route, navigation}) => {
  let {articleImage} = route.params;
  let {articleTitle} = route.params;
  let {articleDesc} = route.params;
  let {articleSource} = route.params;
  let {articleDT} = route.params;
  let {articleAuthor} = route.params;
  let date = moment(articleDT).format('MMMM Do YYYY ');
  let time = moment(articleDT).format('h:mm A ');
  const backIcon = require('../../assets/images/back.png');

  return (
    <View style={{backgroundColor: '#0E0E0E'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.imageContainer}>
        <Image source={backIcon} style={styles.image} />
      </TouchableOpacity>
      <Details
        icon={articleImage}
        title={articleTitle}
        description={articleDesc}
        author={articleAuthor}
        source={articleSource}
        dateTime={date + ' /  ' + time}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#0E0E0E',
  },

  image: {
    width: 30,
    height: 30,
    marginLeft: '2%',
    paddingTop: '15%',
    resizeMode: 'contain',
  },
});
