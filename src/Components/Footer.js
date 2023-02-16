import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import logo from '../assets/logoFull.png'
import { col1 } from '../styles/colors'
const Footer = () => {
  return (
    <View style={styles.footer}>
      <Image source={logo} style={{ width: 100, height: 100 }} />
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
    footer: {
        backgroundColor: col1,
        height: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    }
})