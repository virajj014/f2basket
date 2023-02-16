import { Image, StyleSheet, Text, View, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import patternbgimg from '../../../assets/patternbg.png'
import logofull from '../../../assets/logoFull.png'
import { col1, col2, col3 } from '../../../styles/colors'
import { backbtn, btn1, btn2, cont1, cont2, cont3, cont4, fullbg, fullbgpattern, h1auth, h2auth, input, logobig, logotext } from '../../../styles/auth'
const ForgotPassword2 = ({ navigation, route }) => {
    const { confirmation, phone } = route.params
    const [otp, setOtp] = useState('')
    //  useEffect(() => {}, [])

    const [loading, setLoading] = useState(false)
    const verifyotp = () => {
        setLoading(true)
        confirmation.confirm(otp)
            .then((user) => {
                setLoading(false)
                alert('OTP Verified')
                navigation.navigate('ForgotPassword3', { phone })
            })
            .catch((error) => {
                setLoading(false)
                alert('Invalid OTP')
                alert(error)
            })

    }

    return (

        <View style={fullbg}>
            <Image source={patternbgimg} style={fullbgpattern} />
            <Text style={backbtn}
                onPress={() => navigation.navigate('Welcome')}
            >&lt;</Text>

            {
                loading ?
                    <View style={cont4}>
                        <ActivityIndicator size="large" color={'white'} />
                    </View>
                    :
                    <View style={cont4}>
                        <Text style={h1auth}>Verification</Text>
                        <Text style={h2auth}>An OTP has been sent to your phone.</Text>
                        <View style={{ height: 20 }} />

                        <TextInput
                            placeholderTextColor={col2} style={input} placeholder="6 Digit OTP"
                            secureTextEntry={true}
                            value={otp}
                            onChangeText={(text) => setOtp(text)}
                        />
                        <Text style={btn1}
                            onPress={() => verifyotp()}
                        >Next</Text>
                    </View>
            }
        </View>
    )
}

export default ForgotPassword2

const styles = StyleSheet.create({

})