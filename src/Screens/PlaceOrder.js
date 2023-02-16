import { Alert, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navbtn, navbtnin, navbtnout } from '../styles/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { col1 } from '../styles/colors';
import { btn1 } from '../styles/auth';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PlaceOrder = ({ navigation, route }) => {
    const [orderdata, setOrderdata] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [DeliveryCharge, setDeliveryCharge] = useState(40);
    const [gst, setGst] = useState(5);
    const { cartdata } = route.params;
    useEffect(() => {
        // setOrderdata(cartdata);
        // console.log(JSON.parse(cartdata[0]).data);
        console.log(cartdata);
        // cartdata.map((item) => {
        //     console.log(JSON.parse(item).data.productName)
        // })
    }, [cartdata])

    // --------------------------
    const [userdata, setUserdata] = useState(null);
    const getuserdata = async () => {
        const user = await AsyncStorage.getItem('loggeduser');
        if (user) {
            setUserdata(JSON.parse(user));
            // console.log(user);
        }
        else {
            navigation.navigate('Login');
        }
    }
    const gettotalcost = () => {
        let temp = 0
        cartdata.map((item) => {
            let data1 = JSON.parse(item);
            let cost = parseFloat(data1.data.productPrice) * parseFloat(data1.productquantity);
            temp = temp + cost;
        })
        // console.log(temp);
        setTotalCost(temp);
    }
    useEffect(() => {
        getuserdata();
        gettotalcost();
    }, []);



    const placenow = () => {
        const docRef = firestore().collection('Orders').doc(new Date().getTime().toString());
        const orderdata = {
            orderdata: cartdata,
            ordercost: totalCost,
            orderid: docRef.id,
            orderstatus: 'pending',
            orderdate: new Date().getTime().toString(),
            orderaddress: userdata?.user.address,
            orderphone: userdata?.user.phone,
            ordername: userdata?.user.name,
            orderpayment: 'NOT_SELECTED',
            paymentstatus: 'pending',
            paymenttotal: totalCost + DeliveryCharge + gst / 100 * totalCost,
        }

        console.log(orderdata);
        navigation.navigate('Payments', { orderdata: orderdata });
    }


    const [editaddress, setEditaddress] = useState(false);
    const [newaddress, setNewaddress] = useState('');
    const saveaddress = async () => {

        const usersCollection = firestore().collection('users')
        const user = await AsyncStorage.getItem('loggeduser')

        const userobj = await JSON.parse(user).user

        const userdoc = await usersCollection.doc(userobj.phone).update({
            address: newaddress,
        })


        const userdoc1 = await usersCollection.doc(userobj.phone).get()
        // console.log(userdoc1.data())
        AsyncStorage.setItem('loggeduser', JSON.stringify({ user: userdoc1.data() }))
        alert('Address Updated')
        setEditaddress(false)
        getuserdata()
    }
    return (
        <View style={styles.fullbg}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={navbtnout}>
                <View style={navbtn}>
                    <AntDesign name="back" size={24} color="black" style={navbtnin} />
                </View>
            </TouchableOpacity>

            <ScrollView>
                <View style={styles.container}>
                    {
                        cartdata.map((item, index) => {
                            return (
                                <View style={styles.rowout} key={index}>
                                    <View style={styles.row}>
                                        <View style={styles.left}>
                                            <Text style={styles.qty}>{JSON.parse(item).productquantity}</Text>
                                            <Text style={styles.title}>{JSON.parse(item).data.productName}</Text>
                                            <Text style={styles.price1}>₹{JSON.parse(item).data.productPrice}</Text>
                                        </View>
                                        <View style={styles.right}>
                                            <Text style={styles.totalprice}>₹{parseInt(JSON.parse(item).productquantity) * parseInt(JSON.parse(item).data.productPrice)}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }


                    <View style={styles.userdataout}>
                        <Text style={styles.head1}>Your Details</Text>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={styles.title}>Name :</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={styles.title}>{userdata?.user.name}</Text>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={styles.title}>Phone :</Text>
                            </View>

                            <View style={styles.right}>
                                <Text style={styles.title}>{userdata?.user.phone}</Text>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={styles.title}>Address :</Text>
                            </View>
                            {
                                editaddress ?
                                    <View style={styles.right}>
                                        <TextInput style={styles.address1} placeholder="Enter Address" value={newaddress}
                                            onChangeText={(text) => setNewaddress(text)}
                                        />
                                        <TouchableOpacity onPress={() => {
                                            saveaddress();
                                        }
                                        }

                                        >
                                            <Ionicons name="chevron-forward" size={24} color="black" style={styles.save} />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View style={styles.right}>
                                        <AntDesign name="edit" size={24} color="black" style={styles.qty}
                                            onPress={() => {
                                                setEditaddress(true)
                                                setNewaddress(userdata?.user.address)
                                            }}
                                        />
                                        <Text style={styles.address}>{userdata?.user.address}</Text>
                                        {/* editicon */}
                                    </View>
                            }
                        </View>
                    </View>
                    <View
                        style={{ height: 50 }}
                    ></View>

                    <View style={styles.boxout}>
                        <Text style={styles.boxtxt}>Amount</Text>
                        <Text style={styles.boxtxt}>₹{totalCost}</Text>
                    </View>

                    <View style={styles.boxout}>
                        <Text style={styles.boxtxt}>GST</Text>
                        <Text style={styles.boxtxt}>₹{(gst / 100 * totalCost).toFixed(2)}</Text>
                    </View>

                    <View style={styles.boxout}>
                        <Text style={styles.boxtxt}>Delivery</Text>
                        <Text style={styles.boxtxt}>₹{DeliveryCharge.toFixed(2)}</Text>

                    </View>

                    <View style={styles.boxout}>
                        <Text style={styles.boxtxt}>Total</Text>
                        <Text style={styles.boxtxt}>₹{(gst / 100 * totalCost + totalCost + DeliveryCharge).toFixed(2)} </Text>
                    </View>

                    <View >
                        <TouchableOpacity style={styles.btn1}>
                            <Text style={styles.btntext} onPress={() => placenow()}>Proceed to Payment</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

export default PlaceOrder

const styles = StyleSheet.create({
    fullbg: {
        backgroundColor: 'white',
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 100,
    },
    head1: {
        fontSize: 30,
        fontWeight: '300',
        color: col1,
        margin: 10,
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'space-between',
        // width: '90%',
    },
    rowout: {
        flexDirection: 'column',
        marginVertical: 10,
        elevation: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        width: '90%',
    },

    qty: {
        width: 40,
        height: 30,
        backgroundColor: col1,
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: 10,
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        color: '#5A5A5A'
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginRight: 10,
        color: '#5A5A5A'
    },
    price1: {
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 10,
        color: col1,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '70%',
    },
    totalprice: {
        fontSize: 15,
        fontWeight: 'bold',
        borderRadius: 10,
        padding: 5,
        color: col1,
        backgroundColor: '#111111',
    },
    btntext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: col1,
        margin: 10,
        color: '#5A5A5A',
    },
    boxout: {
        flexDirection: 'row',
        width: '90%',
    },
    boxtxt: {
        fontSize: 16,
        width: '50%',
        borderColor: col1,
        borderWidth: 1,
        padding: 10,
        textAlign: 'center',
        color: '#5A5A5A',
    },
    btn1: {
        backgroundColor: col1,
        borderRadius: 10,
        margin: 10,
    },
    address: {
        fontSize: 15,
        maxWidth: '100%',
        // backgroundColor: '#111111',
        color: '#111111',
        fontWeight: 'bold',
    },
    userdataout: {
        flexDirection: 'column',
        width: '90%',
    },
    address1: {
        fontSize: 15,
        width: '90%',
        borderColor: col1,
        borderWidth: 1,
        // marginBottom: 10,
    },
    save: {
        width: 40,
        height: 50,
        backgroundColor: col1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
    }
})


// ["{\"Addonquantity\":\"0\",\"productquantity\":\"3\",\"data\":{\"productpriceunit\":\"kg\",\"productCategory\":\"fruit\",\"productPrice\":\"120\",\"id\":\"1675391208231\",\"productName\":\"Kashmiri Apple\",\"productImageUrl\":\"https://firebasestorage.googleapis.com/v0/b/orchardfresh-5b6f6.appspot.com/o/productImages%2Fimages.jpg?alt=media&token=10b62237-616e-4b6f-a596-6eeddbd61027\"}}"]


// ["{\"Addonquantity\":\"0\",\"productquantity\":\"1\",\"data\":{\"productpriceunit\":\"kg\",\"productCategory\":\"fruit\",\"productPrice\":\"120\",\"id\":\"1675391208231\",\"productName\":\"Kashmiri Apple\",\"productImageUrl\":\"https://firebasestorage.googleapis.com/v0/b/orchardfresh-5b6f6.appspot.com/o/productImages%2Fimages.jpg?alt=media&token=10b62237-616e-4b6f-a596-6eeddbd61027\"}}"]