import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import {useNavigation} from '@react-navigation/native'
import { firebase } from '../config'
// import { Input } from 'react-native-elements';
export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    loginUser = async (email, password) => {
        try{
            await firebase.auth().signInWithEmailAndPassword(email, password)
        }
        catch(error){
            alert(error.message)
        }
    }
    const styles = StyleSheet.create({
        container :{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
            ,
            marginTop: 10
        }
        ,
        input:{
            paddingTop:20,
            paddingBottom: 10,
            width : 400,
            fontSize: 20,
            borderBottomWidth:1,
            borderBottomColor: '#000',
            marginBottom: 10,
            textAlign: 'center'
        },

        buttonText:{
           marginTop: 50,
            height: 70,
            width: 250, 
            backgroundColor: '#FFFF00',
            alignItems: 'center',
            justifyContent : 'center',
            borderRadius: 10
            
        }
      })
  return (
    <View style = {styles.container}>
      <Text style={{fontSize: 50, fontWeight:'bold'}}>Login</Text>
      <View style = {{marginTop: 40}}>
        <TextInput style = {styles.input}
            id='username'
            placeholder='EmailId'
            onChangeText={(email) => setEmail(email)}
            autoCapitalize='none'
            autoCorrect={false}
        />
        <TextInput style = {styles.input}
            id='password'
            placeholder='Password'
            onChangeText={(password) => setPassword(password)}
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry = {true}
        />
  </View>

      <TouchableOpacity onPress={() => {
        navigation.reset()
        loginUser(email,password)}} style = {styles.buttonText}>
        <Text style = {{fontSize: 20, color: 'blue'}}> Click to Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Registration")}  style = {styles.buttonText}>
        <Text style = {{fontSize: 20, color: 'blue'}}> No account? Register here</Text>
      </TouchableOpacity>
    
  </View>
  ) 


  
}