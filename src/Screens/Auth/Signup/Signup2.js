import { Image, StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import patternbgimg from '../../../assets/patternbg.png'
import logofull from '../../../assets/logoFull.png'
import { col1, col2, col3 } from '../../../styles/colors'
import { backbtn, btn1, btn2, cont1, cont2, cont3, cont4, fullbg, fullbgpattern, h1auth, h2auth, input, logobig, logotext } from '../../../styles/auth'
import firestore from '@react-native-firebase/firestore'

const Signup2 = ({ navigation, route }) => {
    const { confirmation, data } = route.params

    useEffect(() => {
        console.log(data, confirmation)
    }, [])


    const [otp, setOtp] = React.useState('')

    const usersCollection = firestore().collection('users')
    const verify = () => {
        confirmation.confirm(otp)
            .then((res) => {
                if (res.user) {
                    alert('OTP Verified')
                    // navigation.navigate('Signup3', { data })
                    //save data to firebase database
                   usersCollection.doc(data.phone).get()
                        .then((doc) => {
                            if (doc.exists) {
                                alert('User already exists')
                                navigation.navigate('Login')
                            }
                            else {
                                usersCollection.doc(data.phone).set(data)
                                    .then(() => {
                                        alert('User created')
                                        navigation.navigate('Login')
                                    })
                                    .catch((err) => {
                                        alert('Error creating user')
                                        navigation.navigate('Signup1')
                                    })
                            }
                        })

                }
                else {
                    alert('Invalid OTP')
                    navigation.navigate('Signup1')
                }
            })
            .catch((err) => {
                // console.log(err)
                alert('Invalid OTP')
                navigation.navigate('Signup1')
            })
    }
    return (

        <View style={fullbg}>
            <Image source={patternbgimg} style={fullbgpattern} />
            <Text style={backbtn}
                onPress={() => navigation.navigate('Welcome')}
            >&lt;</Text>

            <View style={cont4}>
                <Text style={h1auth}>Verification</Text>
                <Text style={h2auth}>An OTP has been sent to your phone.</Text>
                <View style={{ height: 20 }} />

                <TextInput
                    placeholderTextColor={col2} style={input} placeholder="6 Digit OTP"
                    secureTextEntry={true}
                    onChangeText={(val) => setOtp(val)}
                    keyboardType="number-pad"
                    maxLength={6}
                />
                <Text style={btn1}
                    onPress={() => verify()}
                >Signup</Text>
                <Text style={h2auth}>or</Text>
                <Text style={btn2}
                    onPress={() => navigation.navigate('Login')}
                >Login</Text>
            </View>
        </View>
    )
}

export default Signup2

const styles = StyleSheet.create({

})