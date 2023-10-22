import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

const UserCard = () => {
  return (
    <View style={style.card}>
      <Image
        style={{height: 75, width: 75}}
        source={{uri: 'https://robohash.org/31.png?set=set5'}}
      />
      <Text>User Name</Text>
    </View>
  );
};

const style = StyleSheet.create({
  card: {},
});

export default UserCard;
