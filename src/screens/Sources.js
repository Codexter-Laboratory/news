import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {Tags} from '../components/Tags';
import moment from 'moment';

export const Sources = ({navigation}) => {
  const [data, setData] = useState({egy: [], uae: [], all: []});
  const [active, setActive] = useState({egy: false, uae: false});
  const [refreshing, setRefreshing] = useState(false);

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
    let tempAll = newsEgypt;
    tempAll.push(...newsUAE);
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

  const onPressAll = async () => {
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

  return (
    <View>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Sources</Text>
        <Tags
          onPressAll={onPressAll}
          onPressUae={onPressUae}
          onPressEgy={onPressEgy}
          activeUae={active.uae}
          activeEgy={active.egy}
        />
      </View>
      <FlatList
        data={active.uae ? data.uae : active.egy ? data.egy : data.all}
        initialNumToRender={10}
        keyExtractor={(item, index) => String(index)}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({item}) => {
          let sourceName = item.source.name;
          return (
            <TouchableOpacity
              style={styles.container}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('SourceHeadlines', {
                  sourceName: sourceName,
                  articles: data.egy || data.uae,
                })
              }>
              <Text style={styles.names}>{sourceName}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#1B1B1B',
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#f3f3f3',
    marginBottom: '5%',
  },
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#313236',
    backgroundColor: '#1B1B1B',
  },
  names: {
    color: 'white',
  },
});
