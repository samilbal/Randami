import AsyncStorage from '@react-native-async-storage/async-storage';

const storePost = async post => {
  try {
    const jsonValue = JSON.stringify(post);
    await AsyncStorage.setItem(post.id, jsonValue);
  } catch (e) {
    // saving error
  }
};

const getPost = async () => {
  try {
    const value = await AsyncStorage.getItem();
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};

export {storePost};
