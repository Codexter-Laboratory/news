import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Button,
  Image,
} from 'react-native';

export const SourceHeadlines = ({route, navigation}) => {
  let {sourceName} = route.params;
  let {articles} = route.params;
  const backIcon = require('../../assets/images/back.png');
  return (
    <View style={{backgroundColor: '#1B1B1B', height: '100%'}}>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Sources');
          }}
          style={styles.imageContainer}>
          <Image source={backIcon} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.titleText}>By {sourceName}</Text>
      </View>
      <View style={styles.grayView} />
      <FlatList
        data={articles}
        renderItem={({item}) => {
          return (
            <>
              {item.source.name === sourceName ? (
                <TouchableOpacity
                  style={styles.articlesContainer}
                  onPress={() =>
                    navigation.navigate('Headlines', {
                      articleImage: item.urlToImage,
                      articleTitle: item.title,
                      articleAuthor: item.author,
                      articleDesc: item.description,
                      articleSource: item.source.name,
                      articleDT: item.publishedAt,
                    })
                  }>
                  <Text style={{color: 'white'}}>{item.title}</Text>
                </TouchableOpacity>
              ) : null}
            </>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: '#1B1B1B',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '15%',
  },
  grayView: {
    width: '100%',
    height: '5%',
    backgroundColor: '#313236',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#f3f3f3',
    alignSelf: 'center',
  },
  articlesContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#313236',
    backgroundColor: '#1B1B1B',
  },
  imageContainer: {
    marginTop: '5%',
    marginLeft: '2%',
  },

  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
