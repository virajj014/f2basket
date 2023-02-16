import { Image, StyleSheet, Text, View, TextInput, ScrollView,ActivityIndicator } from 'react-native'
import React,{useState, useEffect} from 'react'
import patternbgimg from '../../../assets/patternbg.png'
import logofull from '../../../assets/logoFull.png'
import { col1, col2, col3 } from '../../../styles/colors'
import { backbtn, btn1, btn2, cont1, cont4, fullbg, fullbgpattern, h1auth, h2auth, input, logobig, logotext } from '../../../styles/auth'
import firestore from '@react-native-firebase/firestore'
const ForgotPassword3 = ({ navigation, route }) => {
    const { phone } = route.params;

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const resetPassword = () => {
        if (password === confirmPassword) {
            setLoading(true)
            const usersCollection = firestore().collection('users')
            usersCollection.doc(phone).update({
                password: password
            }).then(() => {
                setLoading(false)
                alert('Password updated successfully')
                navigation.navigate('Login')
            })
                .catch((error) => {
                    setLoading(false)
                    alert(error)
                })
        }
        else {
            alert('Passwords do not match')
        }
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
                        <Text style={h1auth}>Reset</Text>
                        <Text style={h2auth}>
                            Enter your new password
                        </Text>
                        <View style={{ height: 20 }} />

                        <TextInput placeholderTextColor={col2} style={input} placeholder="New Password"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TextInput placeholderTextColor={col2} style={input} placeholder="Confirm New Password"
                            secureTextEntry={true}
                            value={confirmPassword}
                            onChangeText={(text) => setConfirmPassword(text)}
                        />
                        <Text style={btn1}
                            onPress={() => resetPassword()}
                        >Save</Text>
                    </View>
            }
        </View>
    )
}

export default ForgotPassword3

const styles = StyleSheet.create({

})