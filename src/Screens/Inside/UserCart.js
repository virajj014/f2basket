import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'

import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore';
import { navbtn, navbtnin, navbtnout } from '../../styles/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { col1, col2 } from '../../styles/colors';
import { btn2 } from '../../styles/auth';
import Card2 from '../../Components/cards/Card2';
import BottomNav from '../../Components/BottomNav';
const UserCart = ({ navigation }) => {
    const [cartdata, setCartdata] = useState(null);
    const [totalCost, setTotalCost] = useState('0');

    const getcartdata = async () => {
        const loggeduser = await AsyncStorage.getItem('loggeduser');
        if (loggeduser != null) {
            let userdata = JSON.parse(loggeduser);

            firestore()
                .collection('users')
                .where('phone', '==', userdata.user.phone)
                .get()
                .then((querySnapshot) => {
                    if (querySnapshot.docs.length > 0) {
                        querySnapshot.forEach((documentSnapshot) => {
                            console.log(documentSnapshot.data().cart)
                            if (documentSnapshot.data().cart.length > 0) {
                                setCartdata(documentSnapshot.data().cart)
                                let total = 0;
                                documentSnapshot.data().cart.forEach((item) => {
                                    // console.log(JSON.parse(item).data.productPrice + ' ' + JSON.parse(item).productquantity) 
                                    total += parseFloat(JSON.parse(item).data.productPrice) * parseInt(JSON.parse(item).productquantity)
                                })
                                setTotalCost(total)
                                // console.log(total)
                            }
                            else {
                                alert('Cart is empty')
                                // navigation.navigate('Home')
                            }
                        })
                    }
                    else {
                        alert('Invalid credentials')
                        navigation.navigate('Home')
                    }
                })
                .catch((error) => {
                    alert(error)
                    navigation.navigate('Home')
                })
        }
    }

    React.useEffect(() => {
        getcartdata()
    }, [])


    const deleteItem = async (item) => {
        const loggeduser = await AsyncStorage.getItem('loggeduser');
        if (loggeduser != null) {
            let userdata = JSON.parse(loggeduser);

            firestore()
                .collection('users')
                .where('phone', '==', userdata.user.phone)
                .get()
                .then((querySnapshot) => {
                    if (querySnapshot.docs.length > 0) {
                        querySnapshot.forEach((documentSnapshot) => {
                            let cart = documentSnapshot.data().cart;
                            let index = cart.indexOf(item);
                            if (index > -1) {
                                cart.splice(index, 1);
                                firestore()
                                    .collection('users')
                                    .doc(documentSnapshot.id)
                                    .update({
                                        cart: cart
                                    })
                                    .then(() => {
                                        alert('Item deleted')
                                        getcartdata()
                                    })
                                    .catch((error) => {
                                        alert(error)
                                        navigation.navigate('Home')
                                    })
                            }
                        })
                    }
                    else {
                        alert('Invalid credentials')
                        navigation.navigate('Home')
                    }
                })
                .catch((error) => {
                    alert(error)
                    navigation.navigate('Home')
                })
        }
    }
    return (
        <View style={styles.fullbg}>
        <ScrollView style={styles.containerout}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={navbtnout}>
                <View style={navbtn}>
                    <AntDesign name="back" size={24} color="black" style={navbtnin} />
                </View>
            </TouchableOpacity>

            <View style={styles.container}>
                <Text style={styles.head1}>Your Cart</Text>
                <View style={styles.cartout}>
                    {cartdata == null ?
                        <View style={styles.empty}>
                            <Text style={styles.emptytxt}>Your Cart is Empty</Text>
                        </View>
                        :
                        <View>
                            {
                                cartdata.map((item, index) => {
                                    return (
                                        <Card2 key={index} data={JSON.parse(item)} quantity={JSON.parse(item).productquantity} deleteItem={() => deleteItem(item)} 
                                        navigation={navigation}
                                        />


                                    )
                                })
                            }

                            <View style={styles.totalcont}>
                                <Text style={{ fontSize: 16, fontWeight: '400', color: '#5A5A5A' }}>Total Cost: </Text>
                                <Text style={{ fontSize: 17, fontWeight: '400', color: '#5A5A5A' }}>Rs. {totalCost}</Text>
                            </View>
                        </View>
                    }
                </View>

                <TouchableOpacity style={btn2} onPress={() =>
                    cartdata == null ? alert('Cart is empty') : navigation.navigate('placeorder', { cartdata: cartdata })
                }>
                    <Text style={styles.txt2} >Proceed to Checkout</Text>
                </TouchableOpacity>
            </View>

           
        </ScrollView>
        <View style={{ position: 'absolute', bottom: 0 }}>
                <BottomNav navigation={navigation}/>
            </View>
        </View>
    )
}


export default UserCart

const styles = StyleSheet.create({
    fullbg: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    containerout: {
        flex: 1,
        backgroundColor: 'white',
        // alignItems: 'center',
        width: '100%',
        // height: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        // height: '100%',
    },
    head1: {
        fontSize: 25,
        textAlign: 'center',
        // fontWeight: '200',
        marginVertical: 20,
        color: col1,
    },
    head2: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '400',
        marginVertical: 20,
        elevation: 10,
        backgroundColor: col1,
        width: '90%',
        height: '50%',
        alignSelf: 'center',
        paddingVertical: '25%',
        borderRadius: 10,
        color: 'white',
    },
    cartcard: {
        flexDirection: 'row',
        backgroundColor: col1,
        marginVertical: 5,
        borderRadius: 10,
        width: '95%',
        alignSelf: 'center',
        elevation: 10,
        alignItems: 'center',
    },
    cartimg: {
        width: 100,
        height: 50,
        borderRadius: 10,
    },
    cartcardin: {
        flexDirection: 'column',
        margin: 5,
        width: '58%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: col1,

    },
    cardlist: {
        width: '100%',
    },
    cartout: {
        flex: 1,
        width: '100%',
    },
    btntxt: {
        backgroundColor: col1,
        color: col1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        borderRadius: 10,
        width: '90%',
        textAlign: 'center',

    },
    btncont: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        flexDirection: 'row',
        marginBottom: 80,
        borderTopColor: col2,
        borderTopWidth: 0.2,
    },
    bottomnav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: col1,
        zIndex: 20,
    },
    c1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: col1,
        borderRadius: 10,
        padding: 5,
    },
    txt1: {
        fontSize: 16,
        color: 'white',
        width: '60%',
        fontWeight: 'bold',
    },

    del: {
        color: col1,
    },
    totalcont: {
        flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center', marginVertical: 10,
        backgroundColor: 'white',
        elevation: 3,
        borderRadius: 5,
        padding: 5,
        paddingHorizontal: 20,
    },
    c4: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        marginVertical: 10,
        padding: 5,
    },
    del: {
        color: 'white',
    },
    txt2: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    empty: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    }
})