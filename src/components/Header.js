import { View, Text, Image } from 'react-native'
import React from 'react'

export default function Header(props) {
  return (
    <View style={{marginLeft:15, flexDirection: 'row', gap:60  }}>
      <Text style={{fontWeight:'bold', fontSize:28, color: '#0f0' }}>{props.name}</Text>
      <Image source = {require('../Donate.png')} style = {{width: 40, height: 40, }}></Image>
    </View>
  )
}