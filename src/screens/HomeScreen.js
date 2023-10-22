import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import CreatePost from '../components/CreatePost';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import {COLORS} from '../constants/COLORS';
import {addPost, getPosts} from '../utils/Database';

const HomeScreen = () => {
  const [data, setData] = useState([]);

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const user = JSON.parse(jsonValue).uid;
      uid = user;
      return jsonValue != null ? uid : null;
    } catch (e) {
      // error reading value
    }
  };

  const getRawData = async () => {
    const rawData = await getPosts();
    const _data = rawData.map(item => item.data());
    setData(_data);
  };

  useEffect(() => {
    getRawData();
    const loadthings = async () => {
      const user = await getUser();
      console.log(user);

      subscriber = firestore()
        .collection('posts')
        .doc(`${user}`)
        .collection('userPosts')
        .onSnapshot(querySnapshot => {
          getRawData();
        });

      return () => subscriber();
    };
    // subscriber = firestore()
    //   .collection('posts')
    //   .doc(`${uid}`)
    //   .collection('userPosts')
    //   .onSnapshot(querySnapshot => {
    //     getRawData();
    //   });
    // return () => subscriber();

    loadthings();
  }, []);

  return (
    <View style={styles.container}>
      <Header color={COLORS.secondary} />
      <FlatList
        extraData={data}
        data={data}
        ListEmptyComponent={() => {
          return (
            <Text style={styles.cardTitle}>
              Let's find your first creature! You never know what you'll find!
              Press on the plus button below and see..{'\n\n'}All creatures
              lovingly delivered by Robohash.org
            </Text>
          );
        }}
        renderItem={({item}) => (
          <PostCard post={item} getRawData={getRawData} />
        )}
      />
      <CreatePost addPost={addPost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.accent,
    flex: 1,
  },
  cardTitle: {
    color: 'white',
    lineHeight: 48,
    marginTop: 12,
    fontSize: 22,
    paddingHorizontal: 4,
    fontFamily: 'PixelifySans-Medium',
  },
});

export default HomeScreen;
