import { ActivityIndicator, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { col1 } from '../../styles/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore';
import { useRecoilState } from 'recoil'
import { userDataState } from '../../Providers/userDataProvider'

const AddressPage = ({ }) => {
    const [loading, setLoading] = useState(false)
    const [userdata, setuserdata] = useRecoilState(userDataState)
    const [newaddress, setnewaddress] = React.useState({
        addressline1: '',
        addressline2: '',
        addressline3: '',
        pincode: '',
    })
    const getaddress = async () => {
        const user = await AsyncStorage.getItem('loggeduser')
        const userobj = JSON.parse(user).user
        setnewaddress({
            addressline1: userobj.address?.addressline1,
            addressline2: userobj.address?.addressline2,
            addressline3: userobj.address?.addressline3,
            pincode: userobj.address?.pincode,
        })
    }

    useEffect(() => {
        getaddress()
    }, [])

    const saveaddress = async () => {
        setLoading(true)
        const usersCollection = firestore().collection('users')
        const user = await AsyncStorage.getItem('loggeduser')

        const userobj = await JSON.parse(user).user

        const userdoc = await usersCollection.doc(userobj.phone).update({
            address: newaddress,
        })

        const userdoc1 = await usersCollection.doc(userobj.phone).get()
        AsyncStorage.setItem('loggeduser', JSON.stringify({ user: userdoc1.data() }))
        setuserdata(userdoc1.data())
        setLoading(false)
        ToastAndroid.show('Address Updated', ToastAndroid.SHORT);
    }
    return (
        <View
            style={styles.container}
        >
            <ScrollView>
                <View
                    style={styles.formcont}
                >
                    <Text style={styles.formtitle}>Address Line 1</Text>
                    <TextInput
                        style={styles.forminput}
                        placeholder="Address Line 1"
                        placeholderTextColor={'grey'}
                        value={newaddress.addressline1}
                        onChange={(e) => {
                            setnewaddress({
                                ...newaddress,
                                addressline1: e.nativeEvent.text
                            })
                        }}
                    />
                </View>

                <View
                    style={styles.formcont}
                >
                    <Text style={styles.formtitle}>Address Line 2</Text>
                    <TextInput
                        style={styles.forminput}
                        placeholder="Address Line 2"
                        value={newaddress.addressline2}
                        placeholderTextColor={'grey'}
                        onChange={(e) => {
                            setnewaddress({
                                ...newaddress,
                                addressline2: e.nativeEvent.text
                            })
                        }}
                    />
                </View>


                <View
                    style={styles.formcont}
                >
                    <Text style={styles.formtitle}>Address Line 3</Text>
                    <TextInput
                        style={styles.forminput}
                        placeholder="Address Line 3"
                        value={newaddress.addressline3}
                        placeholderTextColor={'grey'}
                        onChange={(e) => {
                            setnewaddress({
                                ...newaddress,
                                addressline3: e.nativeEvent.text
                            })
                        }}
                    />
                </View>

                <View
                    style={styles.formcont}
                >
                    <Text style={styles.formtitle}>Pincode</Text>
                    <TextInput
                        style={styles.forminput}
                        placeholder="Pincode"
                        placeholderTextColor={'grey'}
                        value={newaddress.pincode}
                        onChange={(e) => {
                            setnewaddress({
                                ...newaddress,
                                pincode: e.nativeEvent.text
                            })
                        }}

                    />
                </View>

                <View
                    style={styles.formcont}
                >
                    {
                        loading ?
                            <ActivityIndicator size="large" color={col1} />
                            : <Text style={styles.formbutton} onPress={saveaddress}>Save</Text>
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default AddressPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    formcont: {
        width: '95%',
        alignSelf: 'center',
        // backgroundColor: 'black',
        marginVertical: 10,
    },
    formtitle: {
        fontSize: 17,
        color: col1
    },
    forminput: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
        fontSize: 15,
        paddingVertical: 10,
        color: 'black',
    },
    formbutton: {
        width: '100%',
        backgroundColor: col1,
        borderRadius: 5,
        elevation: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
        fontSize: 20,
        paddingVertical: 10,
        color: '#fff',
        textAlign: 'center',
    }
})