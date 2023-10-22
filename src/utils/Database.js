import firestore, {serverTimeStamp} from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user');

    const user = JSON.parse(jsonValue).uid;
    const uid = user;
    return jsonValue != null ? uid : null;
  } catch (e) {
    // error reading value
  }
};

const getPosts = async () => {
  uid = await getUser();
  const postsDocument = await firestore()
    .collection('posts')
    .doc(`${uid}`)
    .collection('userPosts')
    .orderBy('cardTag', 'desc')
    .get();

  return postsDocument.docs;
};

const addPost = async post => {
  uid = await getUser();
  await firestore()
    .collection('posts')
    .doc(`${uid}`)
    .collection('userPosts')
    .doc(post.id)
    .set({
      id: post.id,
      imgSource: post.imgSource,
      cardTitle: post.cardTitle,
      cardTag: post.cardTag,
      favorited: false,
    });
};

const deletePost = async post => {
  await firestore()
    .collection('posts')
    .doc(`${uid}`)
    .collection('userPosts')
    .doc(post.id)
    .delete();
};

const favoritePost = async post => {
  await firestore()
    .collection('posts')
    .doc(`${uid}`)
    .collection('userPosts')
    .doc(post.id)
    .set({...post, favorited: !post.favorited});
};

const getFavorites = async () => {
  // const favoritedPosts = await firestore()
  //   .collection('posts')
  //   .doc()
  //   .where('favorited', '==', true)
  //   .orderBy('cardTag', 'desc')
  //   .get();
  const allPosts = await firestore()
    .collection('posts')
    .orderBy('cardTag', 'desc')
    .get();

  const favoritedPosts = allPosts;
  return favoritedPosts;
};

export {addPost, getPosts, favoritePost, deletePost, getFavorites};
