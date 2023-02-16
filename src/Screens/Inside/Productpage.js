
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { col1, col2, col3 } from '../../styles/colors';
import { navbtn, navbtnin, navbtnout } from '../../styles/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native/Libraries/Alert/Alert';
import BottomNav from '../../Components/BottomNav';

const Productpage = ({ navigation, route }) => {
    const data = route.params;
    const [quantity, setquantity] = useState('1');
    const [addonquantity, setaddonquantity] = useState('0');
    const [loading, setloading] = useState(false);
    if (route.params === undefined) {
        navigation.navigate('Home')
    }
    // getting userdata from asyncstorage
    const [userdata, setuserdata] = useState({})
    const getuserdatafromasyncstorage = async () => {
        const data = await AsyncStorage.getItem('loggeduser')
        if (data) {
            setuserdata(JSON.parse(data))
        }
        else {
            navigation.navigate('Welcome')
        }
        console.log(data)
    }
    useEffect(() => {
        getuserdatafromasyncstorage()
    }, [])
    // 

    const increaseQuantity = () => {
        setquantity((parseInt(quantity) + 1).toString())
    }
    const decreaseQuantity = () => {
        if (parseInt(quantity) > 1) {
            setquantity((parseInt(quantity) - 1).toString())
        }
    }



    const addTocart = () => {
        setloading(true)
        firestore()
            .collection('users')
            .where('phone', '==', userdata.user.phone)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((documentSnapshot) => {
                    // const data1 = documentSnapshot.data();
                    const cartdata = JSON.stringify({ Addonquantity: addonquantity, productquantity: quantity, data });
                    firestore()
                        .collection('users')
                        .doc(documentSnapshot.id)
                        .update({
                            cart: firestore.FieldValue.arrayUnion(cartdata)
                        })
                        .then(() => {
                            console.log('User added!');
                            alert('Added to cart')
                            setloading(false)
                        });
                });
                setloading(false)
            })
            .catch((error) => {
                setloading(false)
                console.log(error)
            });
    }
    const cartdata =
        [
            JSON.stringify({ Addonquantity: addonquantity, productquantity: quantity, data })
        ]
        ;
    return (
        <View style={styles.fullbg}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={navbtnout}>
                <View style={navbtn}>
                    <AntDesign name="back" size={24} color="black" style={navbtnin} />
                </View>
            </TouchableOpacity>

            <ScrollView style={styles.fullscroll}>

                <Image source={{
                    uri: data.productImageUrl
                }} style={styles.cardimgin} />

                <View style={styles.c1}>
                    <Text style={styles.c1t1}>{data.productName}</Text>
                    <Text style={styles.c1t2}>₹{data.productPrice} / {data.productpriceunit}</Text>
                </View>

                <View style={styles.c2}>
                    <View style={styles.incrementer}>
                        <Text style={styles.plusminusbtn}
                            onPress={decreaseQuantity}
                        >-</Text>
                        <Text style={styles.quantity}>{quantity}</Text>
                        <Text style={styles.plusminusbtn}
                            onPress={increaseQuantity}
                        >+</Text>
                    </View>

                    <View style={styles.total}>
                        <Text style={styles.totaltext}>Total</Text>
                        <Text style={styles.totaltext}>-</Text>
                        <Text style={styles.totaltext}>₹{data.productPrice * quantity}</Text>
                    </View>
                </View>

                <View style={styles.btncont}>
                    <Text style={styles.btn} onPress={() => navigation.navigate('placeorder', {
                        cartdata:
                            cartdata
                    })}>Buy</Text>
                    {
                        loading ?
                            <Text style={styles.btn}><ActivityIndicator size="large" color='#fff' /></Text>
                            :
                            <Text style={styles.btn} onPress={() => addTocart()}>Add To Cart</Text>
                    }
                </View>

                {
                    data?.productdescription?.length>0 &&
                    <View style={styles.c3}>
                        <Text style={styles.c3t1}>Description</Text>
                        <Text style={styles.c3t2}>{data.productdescription}</Text>
                    </View>
                }

            </ScrollView>

            <View style={styles.bottomnav}>
                <BottomNav navigation={navigation}/>
            </View>
        </View>
    )
}

export default Productpage

const styles = StyleSheet.create({
    fullbg: {
        backgroundColor: 'white',
        minHeight: '100%',
    },
    fullscroll: {
        backgroundColor: 'white',
        minHeight: '100%',
    },
    cardimgin: {
        width: '100%',
        height: 200,
    },
    c1: {
        padding: 10,
    },
    c1t1: {
        fontSize: 20,
        fontWeight: 'bold',
        color: col1,

    },
    c1t2: {
        fontSize: 16,
        color: col2,
    },
    c2: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    incrementer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 100,
        height: 40,
        borderWidth: 1,
        borderColor: col1,
        borderRadius: 5,

    },
    plusminusbtn: {
        fontSize: 20,
        fontWeight: 'bold',
        color: col1,
        width: 30,
        textAlign: 'center',

    },
    quantity: {
        fontSize: 20,
        fontWeight: 'bold',
        color: col1,
        width: 30,
        textAlign: 'center',
    },

    total: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 250,
        height: 40,
        borderWidth: 1,
        borderColor: col1,
        borderRadius: 5,
        padding: 5
    },
    totaltext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: col1,
        width: 70,
        textAlign: 'center',

    },
    btncont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,

    },
    btn: {
        backgroundColor: col1,
        color: '#fff',
        padding: 10,
        width: '48%',
        textAlign: 'center',
        borderRadius: 5,
        fontSize: 16,
        fontWeight: 'bold',

    },
    c3: {
        padding: 10,
    },
    c3t1: {
        fontSize: 20,
        fontWeight: 'bold',
        color: col1,

    },
    c3t2: {
        fontSize: 16,
        color: 'grey',
    },
    bottomnav: {
        position: 'absolute',
        bottom: 0,
    }

})
