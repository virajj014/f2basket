import { Image, StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import patternbgimg from '../../assets/patternbg.png'
import logofull from '../../assets/logoFull.png'
import { col1, col2, col3 } from '../../styles/colors'
import { backbtn, btn1, btn2, cont1, cont2, fullbg, fullbgpattern, h1auth, h2auth, input, logobig, logotext } from '../../styles/auth'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { authState } from '../../Providers/authProvider'
import { useRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = ({ navigation }) => {
    const [phone, setphone] = React.useState('');
    const [password, setpassword] = React.useState('');

    const [isloggedin, setisloggedin] = useState(null);
    const [Loading, setLoading] = useState(false);

    const handlelogin = () => {
        if (phone.length == 10) {

            setLoading(true)

            firestore().collection('users').where('phone', '==', phone).get()
                .then((querySnapshot) => {
                    if (querySnapshot.docs.length > 0) {
                        querySnapshot.forEach((documentSnapshot) => {
                            // alert(documentSnapshot.data().password)
                            setLoading(false)
                            if (documentSnapshot.data().password == password) {
                                // setisloggedin({ isloggedin: true, user: documentSnapshot.data() })
                                AsyncStorage.setItem('loggeduser', JSON.stringify({ user: documentSnapshot.data() }))
                                alert('Login Successfull')
                                navigation.navigate('Home')
                            }
                            else {
                                alert('Invalid credentials')
                            }
                        })
                    }
                    else {
                        alert('Invalid credentials')
                    }
                })
                .catch((error) => {
                    setLoading(false)
                    alert(error)
                })
        }
        else {
            alert('Invalid credentials')
        }
    }


    const checklogin = async () => {
        const loggeduser = await AsyncStorage.getItem('loggeduser');
        // console.log(loggeduser)
        if (loggeduser != null) {
            return JSON.parse(loggeduser);
        }
        else {
            return false
        }
    }
    React.useEffect(() => {
        setLoading(true)
        checklogin().then((data) => {
            if (data) {
                navigation.navigate('Home')
                setisloggedin(true)
                setLoading(false)
            }
            else {
                setisloggedin(false)
                setLoading(false)
            }
        })
            .catch((error) => {
                setisloggedin(false)
                setLoading(false)
                alert(error)
            })

    }, [])
    return (
        <View style={fullbg}>
            <Image source={patternbgimg} style={fullbgpattern} />
            <Text style={backbtn}
                onPress={() => navigation.navigate('Welcome',{callchecklogin:true})}
            >&lt;</Text>
            {
                isloggedin != null &&
                    <View style={cont1}>
                        <Image source={logofull} style={logobig} />
                        <Text style={logotext}>Order Your Favourite Fruits & Plants</Text>
                    </View>
            }

            {
                isloggedin != null &&
                <View style={cont2}>
                    <Text style={h1auth}>Login</Text>
                    <Text style={h2auth}>Login to start using our services</Text>
                    <View style={{ height: 20 }} />
                    <TextInput placeholderTextColor={col2} style={input} placeholder="Phone Number"
                        keyboardType="numeric"
                        value={phone}
                        maxLength={10}
                        onChangeText={(text) => setphone(text)}
                    />
                    <TextInput placeholderTextColor={col2} style={input} placeholder="Password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setpassword(text)}
                    />
                    <Text style={h2auth}
                        onPress={() => navigation.navigate('ForgotPassword1')}
                    >Forgot Password?</Text>
                    {
                        Loading ? <ActivityIndicator size="large" color={col2} /> :
                            <Text style={btn1}
                                onPress={() => handlelogin()}
                            >Login</Text>
                    }
                    <Text style={h2auth}>or</Text>
                    <Text style={btn2}
                        onPress={() => navigation.navigate('Signup1')}
                    >Sign Up</Text>
                </View>
            }

            {
                isloggedin == null &&
                <ActivityIndicator
                    size="large"
                    color={col2}
                />
            }
        </View>
    )
}

export default Login

const styles = StyleSheet.create({

})