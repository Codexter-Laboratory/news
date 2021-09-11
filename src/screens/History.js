import React, {useCallback, useEffect, useState} from 'react';
import {Article} from '../components/Article';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {Tags} from '../components/Tags';

export const History = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    setRefreshing(true);
    const fetchHistory = await AsyncStorage.getItem('@history');
    const history = JSON.parse(fetchHistory);
    const tempHistory = history;
    history.forEach(i => {
      if (!tempHistory.some(j => j.urlToImage === i.urlToImage)) {
        tempHistory.push(i);
      }
    });
    setArticles(tempHistory.reverse());
    setRefreshing(false);
  };

  useEffect(() => {
    getArticles();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getArticles();
    setRefreshing(false);
  }, []);

  const renderArticles = () => (
    <FlatList
      data={articles}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      refreshing={refreshing}
      onRefresh={onRefresh}
      renderItem={({item}) => {
        let dateTime = moment(item.publishedAt).format('MMMM Do YYYY , h:mm a');
        const onArticlePress = async () => {
          navigation.navigate('Headlines', {
            articleImage: item.urlToImage,
            articleTitle: item.title,
            articleAuthor: item.author,
            articleDesc: item.description,
            articleSource: item.source.name,
            articleDT: item.publishedAt,
          });
        };
        return (
          <>
            <View style={{backgroundColor: '#1B1B1B'}}>
              <Article
                icon={item.urlToImage}
                title={item.title}
                author={item.author}
                description={item.description}
                source={item.source.name}
                onPress={onArticlePress}
                dateTime={dateTime}
              />
            </View>
          </>
        );
      }}
    />
  );
  return (
    <View style={{backgroundColor: '#1B1B1B', height: '100%'}}>
      <View style={styles.grayView} />
      {renderArticles()}
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: '#1B1B1B',
    width: '100%',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
});
