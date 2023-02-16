import { Image, StyleSheet, Text, View, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import patternbgimg from '../../../assets/patternbg.png'
import logofull from '../../../assets/logoFull.png'
import { col1, col2, col3 } from '../../../styles/colors'
import { backbtn, btn1, btn2, cont1, cont2, cont3, cont4, fullbg, fullbgpattern, h1auth, h2auth, input, logobig, logotext } from '../../../styles/auth'
import auth from '@react-native-firebase/auth'

const ForgotPassword1 = ({ navigation }) => {
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)


    const sendotp = () => {

        if (phone.length == 10) {
            setLoading(true)
            auth().signInWithPhoneNumber('+91' + phone)
                .then((confirmation) => {
                    setLoading(false)
                    navigation.navigate('ForgotPassword2', { confirmation, phone })
                })
                .catch((error) => {
                    setLoading(false)
                    alert(error)
                })
        }
        else {
            alert('Enter Valid Phone Number')
        }
    }
    return (

        <View style={fullbg}>
            <Image source={patternbgimg} style={fullbgpattern} />
            <Text style={backbtn}
                onPress={() => navigation.navigate('Login')}
            >&lt;</Text>

            {
                loading ?
                    <View style={cont4}>
                        <ActivityIndicator size="large" color={'white'} />
                    </View>
                    :
                    <View style={cont4}>
                        <Text style={h1auth}>Contact</Text>
                        <Text style={h2auth}>Enter Registered Mobile Number</Text>
                        <View style={{ height: 20 }} />

                        <TextInput
                            placeholderTextColor={col2} style={input} placeholder="Phone Number"
                            value={phone}

                            onChangeText={(text) => setPhone(text)}
                        />
                        <Text style={btn1}
                            onPress={() => sendotp()}
                        >Submit</Text>
                    </View>
            }
        </View>
    )
}

export default ForgotPassword1

const styles = StyleSheet.create({

})