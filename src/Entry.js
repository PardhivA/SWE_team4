import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DonorInterface from "./DonorSrc/DonorInterface";
import ReceiverInterface from "./ReceiverSrc/ReceiverInterface";






export default function Entry()
{
    const Stack = createStackNavigator();
    const navigation = useNavigation();

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

    return(
        
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("DonorInterface")}  style = {styles.buttonText}>
                <Text style = {{fontSize: 20, color: 'blue'}}> Donor </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("ReceiverInterface")}  style = {styles.buttonText}>
                <Text style = {{fontSize: 20, color: 'blue'}}> Receiver </Text>
            </TouchableOpacity>
        </View>
        
    );
}