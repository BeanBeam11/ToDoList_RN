import { Platform } from 'expo-modules-core';
import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import Task from './components/Task';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [image, setImage] = useState(null);
  const [imageItems, setImageItems] = useState([]);

  const bsRef = React.createRef();
  const fall = new Animated.Value(1);

  const takePhotoFromCamera = async () =>{
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    }).then(bsRef.current.snapTo(1));

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  const choosePhotoFromLibrary = async () =>{
    // Ask the user for the permission to access the media library 
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    }).then(bsRef.current.snapTo(1));

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }    
  }

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Photo</Text>
      </View>
      <TouchableOpacity style={styles.panelButtonNormal} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButtonNormal} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButtonDanger} onPress={()=> bsRef.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );

  const handleAddTask = () =>{
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
    setImageItems([...imageItems, image]);
    setImage(null);
  }

  const completeTask = (index) =>{
    let itemsCopy = [...taskItems];
    let imageCopy = [...imageItems];
    itemsCopy.splice(index, 1);
    imageCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    setImageItems(imageCopy);
  }

  return (
    <>
    <Animated.View style={[
      styles.container,
      {opacity: Animated.add(0.1, Animated.multiply(fall, 1.0))}
    ]}>

      {/* Today's Task */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <ScrollView style={styles.items}>
          {/* This is where the task will go! */}
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item} image={imageItems[index]}/>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>

      {/* Write a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={"Write a task"} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => (bsRef.current.snapTo(0),Keyboard.dismiss())}>
          <View style={styles.cameraWrapper}>
            <FontAwesome name="camera" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </Animated.View>

    {/* Add Photo Bottom Sheet */}
    <BottomSheet 
      ref = {bsRef}
      snapPoints={[330, 0, 0]}
      renderContent={renderInner}
      renderHeader={renderHeader}
      initialSnap={1}
      callbackNode={fall}
      enabledContentGestureInteraction={true}
    />
    </>
  );
}

const btnColor = {
  normal: {
    backgroundColor: '#55BCF6',
  },
  danger: {
    backgroundColor: '#f65555',
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    height: '85%',
    paddingTop: 80,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 230,
  },
  cameraWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
  header: {
    backgroundColor: '#FFF',
    shadowColor: '#808080',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10
  },
  panel: {
    backgroundColor: '#FFF',
    width: '100%',
    height: '100%'
  },
  panelTitle: {
    fontSize: 24,
    paddingTop: 10,
    paddingBottom: 5,
  },
  panelSubtitle: {
    color: '#808080',
    paddingBottom: 10
  },
  panelButtonNormal: {
    width: '70%',
    paddingVertical: 15,
    backgroundColor: btnColor.normal.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: '15%',
    marginVertical: 5
  },
  panelButtonDanger: {
    width: '70%',
    paddingVertical: 15,
    backgroundColor: btnColor.danger.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: '15%',
    marginVertical: 5
  },
  panelButtonTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  }
});