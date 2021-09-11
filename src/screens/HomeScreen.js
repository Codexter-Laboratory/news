import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {Article} from '../components/Article';
import {Tags} from '../components/Tags';

export const Home = ({navigation, route}) => {
  const [newsData, setData] = useState({egy: [], uae: [], all: []});
  const [active, setActive] = useState({egy: false, uae: false});
  const [refreshing, setRefreshing] = useState(false);
  const [history, setHistory] = useState([]);

  //get news for Egypt and UAE and sort them by most recent in newsData.all
  const getNews = async () => {
    const urlUAE =
      'https://newsapi.org/v2/top-headlines?country=ae&apiKey=257f1c291e85414ba2e7deb64b72d8a7';
    const urlEgypt =
      'https://newsapi.org/v2/top-headlines?country=eg&apiKey=257f1c291e85414ba2e7deb64b72d8a7\n';
    let responseUae = await fetch(urlUAE);
    let responseEgy = await fetch(urlEgypt);
    let resultUae = await responseUae.json();
    let resultEgy = await responseEgy.json();
    let newsUAE = resultUae.articles;
    let newsEgypt = resultEgy.articles;
    let tempAll = newsUAE;
    tempAll.push(...newsEgypt);
    tempAll.sort((a, b) => {
      let aTime = moment(a.publishedAt).format('h:mm:ss');
      let bTime = moment(b.publishedAt).format('h:mm:ss');
      return bTime.localeCompare(aTime);
    });
    setData({egy: newsEgypt, uae: newsUAE, all: tempAll});
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getNews();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getNews();
  }, []);

  const onPressALl = async () => {
    setRefreshing(true);
    setActive({egy: false, uae: false});
    await getNews();
    setRefreshing(false);
  };

  const onPressEgy = async () => {
    setRefreshing(true);
    setActive({egy: true, uae: false});
    await getNews();
    setRefreshing(false);
  };
  const onPressUae = async () => {
    setRefreshing(true);
    setActive({egy: false, uae: true});
    await getNews();
    setRefreshing(false);
  };

  const renderNews = () => (
    <FlatList
      data={
        active.uae ? newsData.uae : active.egy ? newsData.egy : newsData.all
      }
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      refreshing={refreshing}
      onRefresh={onRefresh}
      renderItem={({item}) => {
        let dateTime = moment(item.publishedAt).format('MMMM Do YYYY , h:mm a');
        const onArticlePress = async () => {
          let tempHistoryData = history;
          tempHistoryData.push(item);
          setHistory(tempHistoryData);
          try {
            await AsyncStorage.setItem('@history', JSON.stringify(history));
            await AsyncStorage.setItem('@time', JSON.stringify(history));
          } catch (error) {
            console.log('Error saving: ', error.message);
          }
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
    <View>
      {/*<Text style={styles.title}>Today's Picks</Text>*/}
      <Tags
        onPressUae={onPressUae}
        onPressEgy={onPressEgy}
        onPressAll={onPressALl}
        activeUae={active.uae}
        activeEgy={active.egy}
      />
      {renderNews()}
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#1B1B1B',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#f3f3f3',
    marginBottom: '5%',
  },
});
