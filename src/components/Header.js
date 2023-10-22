import React from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderLogo from './Logo';

const Header = ({color}) => {
  return (
    <View style={[style.container, {backgroundColor: color}]}>
      <HeaderLogo />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderTopLeftRadius: 200,
    borderTopRightRadius: 29,
    borderBottomLeftRadius: 29,
    borderBottomRightRadius: 200,
    margin: 10,
  },
});

export default Header;
