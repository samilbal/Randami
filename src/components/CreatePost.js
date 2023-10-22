import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {FAB, TextInput} from 'react-native-paper';
import {COLORS} from '../constants/COLORS';
import {GeneratePost} from '../utils/GeneratePost';

export default CreatePost = ({addPost, getRawData}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = React.useState('');

  return (
    <View style={styles.centeredView}>
      <Modal
        onDismiss={() => setModalVisible(!modalVisible)}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              label="Enter a prompt for your next post:"
              mode="outlined"
              value={text}
              onChangeText={text => setText(text)}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => (
                addPost(GeneratePost(text)),
                setModalVisible(!modalVisible),
                setText('')
              )}>
              <Text style={styles.textStyle}>Randami!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <FAB
        icon="plus"
        size="20"
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  createButton: {},
  button: {
    borderRadius: 20,
    marginTop: 14,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: COLORS.secondary,
  },
  buttonClose: {
    backgroundColor: COLORS.primary,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
