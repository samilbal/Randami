import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {COLORS} from '../constants/COLORS';
import {deletePost, favoritePost} from '../utils/Database';

const ActionButtons = ({post, getRawData, downloadImage, shareImage}) => {
  return (
    <View style={style.actionButtons}>
      <IconButton
        icon={post.favorited ? 'heart' : 'heart-outline'}
        iconColor={COLORS.error}
        size={20}
        mode="outlined"
        onPress={() => (favoritePost(post), getRawData())}
      />
      <IconButton
        icon="delete"
        iconColor={COLORS.error}
        size={20}
        mode="outlined"
        onPress={() => (deletePost(post), getRawData())}
      />
      <IconButton
        icon="content-save"
        iconColor={COLORS.error}
        size={20}
        mode="outlined"
        onPress={() => downloadImage()}
      />
      <IconButton
        icon="share"
        iconColor={COLORS.error}
        size={20}
        mode="outlined"
        onPress={() => shareImage()}
      />
    </View>
  );
};

const style = StyleSheet.create({
  actionButtons: {
    position: 'absolute',
    right: 0,
  },
});
export default ActionButtons;
