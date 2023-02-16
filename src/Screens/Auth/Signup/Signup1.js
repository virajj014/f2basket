import { Image, StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import patternbgimg from '../../../assets/patternbg.png'
import logofull from '../../../assets/logoFull.png'
import { col1, col2, col3 } from '../../../styles/colors'
import { backbtn, btn1, btn2, cont1, cont2, cont3, cont4, fullbg, fullbgpattern, h1auth, h2auth, input, logobig, logotext } from '../../../styles/auth'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import auth from '@react-native-firebase/auth'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const Signup1 = ({ navigation }) => {
    const [data, setData] = React.useState({})

    const sendotp = () => {
        // navigation.navigate('Signup2')

        if (data.password.length >= 6) {
            auth().signInWithPhoneNumber('+91' + data.phone)
                .then((confirmation) => {
                    navigation.navigate('Signup2', { confirmation, data })
                })
        }
        else {
            alert('Password should be atleast 6 characters')
        }
    }
    return (

        <KeyboardAvoidingView style={fullbg}>
            <Image source={patternbgimg} style={fullbgpattern} />
            <Text style={backbtn}
                onPress={() => navigation.navigate('Welcome')}
            >&lt;</Text>

            <View style={cont4}>
                <Text style={h1auth}>Signup</Text>
                <Text style={h2auth}>Signup to start using our services</Text>
                <View style={{ height: 20 }} />
                <TextInput placeholderTextColor={col2} style={input} placeholder="Full Name"
                    onChangeText={(val) => setData({ ...data, name: val })}
                />
                <TextInput placeholderTextColor={col2} style={input} placeholder="Address"
                    onChangeText={(val) => setData({ ...data, address: val })}
                />
                <TextInput placeholderTextColor={col2} style={input} placeholder="Pincode"
                    onChangeText={(val) => setData({ ...data, pincode: val })}
                />
                <TextInput placeholderTextColor={col2} style={input} placeholder="Phone Number"
                    maxLength={10}

                    onChangeText={(val) => setData({ ...data, phone: val })}
                />
                <TextInput placeholderTextColor={col2} style={input} placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(val) => setData({ ...data, password: val })}
                />

                <Text style={btn1}
                    onPress={() => sendotp()}
                >Signup</Text>
                <Text style={h2auth}>or</Text>
                <Text style={btn2}
                    onPress={() => navigation.navigate('Login')}
                >Login</Text>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Signup1

const styles = StyleSheet.create({

})