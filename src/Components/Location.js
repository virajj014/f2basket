import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Geocoder from 'react-native-geocoding'
import Geolocation from '@react-native-community/geolocation'
import { col1, col2 } from '../styles/colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Location = () => {
    const [address, setAddress] = React.useState('')

    const getOldAddress = async () => {
        const user = await AsyncStorage.getItem('loggeduser')
        const userobj = JSON.parse(user).user
        setAddress(userobj.address)
    }

    useEffect(() => {
        getOldAddress()
    }, [])
    return (
        <View style={styles.c1}>
            <View style={styles.c3}>
                <View style={styles.c2}>
                    <MaterialIcons name="location-on" size={20} color="#fff" style={styles.icon} />
                    <Text style={styles.t1}>{address}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#fff" style={styles.icon1} />
            </View>
        </View>
    )
}

export default Location

const styles = StyleSheet.create({
    c1: {
        backgroundColor: '#fff',
        width: '100%',
        alignSelf: 'center',
        padding: 2,
        paddingHorizontal: 20,
        alignItems: 'center',
        // justifyContent: 'space-between',
        flexDirection: 'row',
    },
    t1: {
        color: col1,
        fontSize: 15,
        width: '90%',
        overflow: 'hidden',
        height: 20,
        color: '#000',
    },
    icon: {
        color: col1,
        fontSize: 16,
    },
    icon1: {
        color: col1,
        fontSize: 16,
        backgroundColor: '#fff',
        borderRadius: 50,
        elevation: 5,
    },
    c2: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 5,
        alignItems: 'center',
        // justifyContent: 'space-between',
        // width: '30%',
        // elevation: 5,
    },
    c3: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '70%',
    }
})