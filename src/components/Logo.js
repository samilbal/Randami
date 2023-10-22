import React, {useState} from 'react';
import {View, Text} from 'react-native';

const HeaderLogo = () => {
  return (
    <View>
      <Text
        style={{
          color: 'white',
          fontFamily: 'PixelifySans-SemiBold',
          fontSize: 42,
        }}>
        Randami
      </Text>
    </View>
  );
};

export default HeaderLogo;
