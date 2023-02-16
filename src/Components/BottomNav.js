import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import  AntDesign  from 'react-native-vector-icons/AntDesign';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import {col1} from '../styles/colors'
import  FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
const BottomNav = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* <Text>BottomNav</Text> */}
            <View style={styles.btncon1}>
                <AntDesign name="home" size={30} color="black" style={styles.icon1} onPress={() => { navigation.navigate('Home') }} />

            </View>
           
            <View style={styles.btncon1} >
                <AntDesign name="shoppingcart" size={30} color="black" style={styles.icon1} onPress={() => { navigation.navigate('cart') }} />

            </View>
            <View style={styles.btncon1} >
                <FontAwesome5 name="map-marked-alt" size={30} color="black" style={styles.icon1} onPress={() => { navigation.navigate('trackorders') }} />
            </View>

            <View style={styles.btncon1} >
                {/* settings */}
                <AntDesign name="setting" size={30} color="black" style={styles.icon1} onPress={() => { navigation.navigate('settings') }} />
            </View>
        </View>
    )
}

export default BottomNav

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        elevation: 30,
        borderTopColor: col1,
        borderTopWidth: 0.5,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        paddingVertical: 10,
    },
    btncon1: {
        alignItems: 'center',
    },
    btncon2: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: -20,
        backgroundColor: col1,
        width: 60,
        height: 60,
        borderRadius: 60,
    },
    icon2: {
        color: 'white',

    },
    icon1: {
        color: col1,

    }
})