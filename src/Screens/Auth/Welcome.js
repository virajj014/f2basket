import { Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import patternbgimg from '../../assets/patternbg.png'
import logofull from '../../assets/logoFull.png'
import { col1, col2 } from '../../styles/colors'
import { btn1, btn2, cont1, cont2, fullbg, fullbgpattern, h1auth, h2auth, logobig, logotext } from '../../styles/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Welcome = ({ navigation,route }) => {
    const {callchecklogin} = route?.params;
    const [isloggedin, setisloggedin] = useState(false);
    const checklogin = async () => {
        const loggeduser = await AsyncStorage.getItem('loggeduser');
        if (loggeduser != null) {
            return JSON.parse(loggeduser);
        }
        else {
            return false
        }
    }

    if(callchecklogin){
        checklogin().then((data) => {
            console.log(data)
            if (data) {
                setisloggedin(true)
                navigation.navigate('Home')
            }
            else {
                setisloggedin(false)
            }
        })
    }

    useEffect(() => {
        checklogin().then((data) => {
            console.log(data)
            if (data) {
                setisloggedin(true)
                navigation.navigate('Home')
            }
            else {
                setisloggedin(false)
            }
        })
    }, [])
    return (
        <View style={fullbg}>
            <Image source={patternbgimg} style={fullbgpattern} />
            {
                isloggedin == false && <View style={cont1}>
                    <Image source={logofull} style={logobig} />
                    <Text style={logotext}>Order Your Favourite Fruits & Plants</Text>
                </View>
            }

            {
                isloggedin == false &&
                <View style={cont2}>
                    <Text style={h1auth}>Welcome</Text>
                    <Text style={h2auth}>Login or Sign Up to start using our services</Text>
                    <View style={{ height: 20 }} />
                    <Text style={btn1}
                        onPress={() => navigation.navigate('Login')}
                    >Login</Text>
                    <Text style={btn2}
                        onPress={() => navigation.navigate('Signup1')}
                    >Sign Up</Text>
                </View>
            }

            {/* {
                isloggedin == null &&

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={col2} />
                </View>
            } */}
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({

})