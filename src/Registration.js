import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, {useState, useEffect  } from 'react'
import {firebase} from '../config'
import * as Location from 'expo-location';

export default function Registration() {
 const  [emailid, setEmailid] = useState();
  const [password, setPassword] =  useState();
  const [firstName, setFirstName]  = useState();
  const [lastName, setLastname] = useState();
  const [phone_number, setPhone_number] = useState();

    registerUser = async (email, password, firstName, lastName) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password).then(
            () => {
                firebase.auth().currentUser.sendEmailVerification({
                    handleCodeInApp: true,
                    url : "https://finaltry-680f1.firebaseapp.com",

                })
                .then(()=>{
                    alert("Verification Email Sent")

                })
                .catch((error)=>{
                    error.message
                })
                .then(()=>{
                    firebase.firestore().collection('users')
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        firstName,
                        lastName,
                        email,
                        phone_number,
                        location,   
                    })
                    
                }).catch((error)=>{
                    alert(error.message)
                }) 
            }
        )
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


      const [location, setLocation] = useState(null);
      const [errorMsg, setErrorMsg] = useState(null);
    
      useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, []);
    
      let text = 'Waiting..';
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location);
      }

    return (

        


        <View style = {styles.container}>
          
          <Text style={{fontSize: 50, fontWeight:'bold'}}>Register</Text>
          <View style = {{marginTop: 40}}>
          <TextInput style = {styles.input}
                id='firstName'
                placeholder='firstName'
                onChangeText={(firstName) => setFirstName   (firstName)}
                autoCapitalize='none'
                autoCorrect={false}
            />
            <TextInput style = {styles.input}
                id='LastName'
                placeholder='LastName'
                onChangeText={(LastName) => setLastname(LastName)}
                autoCapitalize='none'
                autoCorrect={false}
            />
            <TextInput style = {styles.input}
                id='emailId'
                placeholder='EmailId'
                onChangeText={(email) => setEmailid(email)}
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

            <TextInput style = {styles.input}
                id='phone_number'
                placeholder='phone_number'
                onChangeText={(phone_number) => setPhone_number(phone_number)}
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry = {true}
            />
          </View>
          <TouchableOpacity onPress={() => registerUser(emailid, password, firstName, lastName, phone_number, location)}  style = {styles.buttonText}>
        <Text style = {{fontSize: 20, color: 'blue'}}> Register </Text>
      </TouchableOpacity>
    </View>
    )
}