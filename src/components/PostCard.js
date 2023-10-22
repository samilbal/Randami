import * as React from 'react';
import {PermissionsAndroid, Alert, Platform} from 'react-native';
import ViewShot, {captureRef} from 'react-native-view-shot';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import Share from 'react-native-share';

import {Image, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {COLORS} from '../constants/COLORS';
import ActionButtons from './ActionButtons';

const PostCard = ({post, getRawData, color}) => {
  // create a ref
  const viewRef = React.useRef();

  // get permission on android
  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Image Download Permission',
          message: 'Your permission is required to save images to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        console.log('no permisison granted');
      }
    } catch (err) {
      // handle error as you please
      console.log('err', err);
    }
  };

  // download image
  const downloadImage = async () => {
    try {
      // react-native-view-shot caputures component
      const uri = await captureRef(viewRef, {
        format: 'jpg',
        quality: 0.8,
        snapshotContentContainer: false,
      });

      if (Platform.OS === 'android') {
        const granted = await getPermissionAndroid();
        if (granted) {
          return;
        }
      }

      // cameraroll saves image
      const image = CameraRoll.save(uri, 'photo');
      if (image) {
        Alert.alert(
          '',
          'Image saved successfully.',
          [{text: 'OK', onPress: () => {}}],
          {cancelable: false},
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const shareImage = async () => {
    try {
      // capture component
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 1,
        backgroundColor: 'white',
      });

      // share
      const options = {
        url: uri,
        message: 'I created this using Randami!',
        social: Share.Social.WHATSAPP,
        showAppsToView: true,
      };
      const shareResponse = await Share.open(options);
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View style={[style.card, color ? {backgroundColor: color} : null]}>
      <ViewShot
        style={[style.cardTop, color ? {backgroundColor: color} : null]}
        ref={viewRef}>
        <Image
          source={{uri: post.imgSource}}
          resizeMode="cover"
          style={style.image}
        />
        <Text style={style.cardTitle} ellipsizeMode="tail" numberOfLines={1}>
          {post.cardTitle}
        </Text>
      </ViewShot>
      <ActionButtons
        post={post}
        getRawData={getRawData}
        downloadImage={downloadImage}
        shareImage={shareImage}
      />
    </View>
  );
};

const style = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primary,
    flexDirection: 'column',
    borderRadius: 12,
    marginBottom: 8,
    padding: 4,
    marginHorizontal: 6,
    elevation: 22,
  },
  image: {
    height: 250,
    width: 250,
    alignSelf: 'center',
  },
  cardTitle: {
    fontSize: 36,
    paddingHorizontal: 4,
    fontFamily: 'PixelifySans-Medium',
  },
  cardBody: {
    fontSize: 14,
    borderRadius: 28,
    borderColor: 'red',
  },
  cardTag: {
    fontSize: 12,
    fontStyle: 'italic',
    paddingTop: 2,
    paddingBottom: 2,
  },
  cardTop: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  cardBottom: {
    alignSelf: 'center',
  },
});

export default PostCard;
