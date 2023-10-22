import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import {COLORS} from '../constants/COLORS';
import {getPosts} from '../utils/Database';

const FavoritesScreen = ({navigation}) => {
  const [data, setData] = useState([]);

  const getRawData = async () => {
    const rawData = await getPosts();
    const _data = rawData.map(item => item.data());
    const favorites = _data.filter(post => {
      return post.favorited == true;
    });

    setData(favorites);
  };
  useEffect(() => {
    getRawData();

    const subscriber = firestore()
      .collection('posts')
      .doc(`${uid}`)
      .collection('userPosts')
      .onSnapshot(() => {
        getRawData();
      });
    return () => subscriber();
  }, []);

  return (
    <View style={{backgroundColor: COLORS.pop, flex: 1}}>
      <Header color={COLORS.popDark} />
      <FlatList
        ListEmptyComponent={() => {
          return (
            <Text style={styles.cardTitle}>
              It seems you have no favorites, YET! Keep on creating! P.S.: The
              creatures you find are infinite. Feel free to try and see them
              all..{'\n\n'}All creatures lovingly delivered by Robohash.org
            </Text>
          );
        }}
        extraData={data}
        data={data}
        renderItem={({item}) => (
          <PostCard post={item} getRawData={getRawData} color={COLORS.fav} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    color: 'white',
    lineHeight: 48,
    marginTop: 12,
    fontSize: 22,
    paddingHorizontal: 4,
    fontFamily: 'PixelifySans-Medium',
  },
});
export default FavoritesScreen;
