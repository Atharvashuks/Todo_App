import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Task from './components/Task';
import {Keyboard} from 'react-native'
import { ScrollView } from 'react-native';

export default function App() {

  const [task, setTask] = useState();
  const [taskItems,setTaskItems] = useState([]);

  const handelAddTask = () => { 
    Keyboard.dismiss();
    console.log(task);
    setTaskItems([...taskItems,task])
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    <View style={styles.container}>
     <View style={styles.tasksWrapper}>
       <Text style={styles.sectionTitle}>Today's tasks</Text>

       <ScrollView>
       <View style={styles.items}>
       {
         taskItems.map((item,index) => {
           return(
             <TouchableOpacity key={index} onPress={() => completeTask(index)}>
             <Task key={index} text={item} />
             </TouchableOpacity>
           ) 
         })
       }
        {/* <Task text={'task 1'}/>
        <Task text={'task 2'}/> */}
       </View>
       </ScrollView>
       

     </View>
      

        {/* Write a task section */}
        <KeyboardAvoidingView
        behaviour='position'
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={styles.writeTaskWrapper}
        >
          <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)}/>

          <TouchableOpacity onPress={() => handelAddTask()}>
            <View style={styles.addWrapper}>
            <Text style={styles.addtext}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaed',
  },
  tasksWrapper: {
    padding: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop : 10,
  },
  writeTaskWrapper: {
    position : 'absolute',
    bottom : 20,
    width : '100%',
    flexDirection : 'row',
    justifyContent : 'space-around',
    alignItems : 'center',
  },
  input : {
    paddingVertical : 15,
    paddingHorizontal : 25,
    backgroundColor : '#fff',
    borderRadius : 60,
    borderColor : '#c0c0c0',
    borderWidth : 1,
    width : 250,
    display : 'flex',
    alignItems : 'center',
    justifyContent : 'center',
  },
  addWrapper: {
    width : 60,
    height : 60,
    backgroundColor : '#fff',
    borderRadius : 60,
    justifyContent : 'center',
    alignItems : 'center',
    borderColor : '#c0c0c0',
    borderWidth : 1,
  },
});
