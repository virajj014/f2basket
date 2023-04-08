import { Alert, StyleSheet, Text, TouchableOpacity, View, TextInput, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navbtn, navbtnin, navbtnout } from '../styles/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { col1 } from '../styles/colors';
import { btn1 } from '../styles/auth';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainerRefContext } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { userDataState } from '../Providers/userDataProvider';

const PlaceOrder = ({ navigation, route }) => {
    const [orderdata, setOrderdata] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [DeliveryCharge, setDeliveryCharge] = useState(40);
    const [gst, setGst] = useState(5);
    const { cartdata } = route.params;
    const [userdata, setuserdata] = useRecoilState(userDataState)

    useEffect(() => {
        // console.log(cartdata);
    }, [cartdata])

    const getuserdata = async () => {
        const user = await AsyncStorage.getItem('loggeduser');
        if (user) {
            setuserdata(JSON.parse(user).user);
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
            orderaddress: userdata?.address,
            orderphone: userdata?.phone,
            ordername: userdata?.name,
            orderpayment: 'NOT_SELECTED',
            paymentstatus: 'pending',
            paymenttotal: totalCost + DeliveryCharge + gst / 100 * totalCost,
        }

        // console.log(orderdata);
        navigation.navigate('Payments', { orderdata: orderdata });
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
                                            <Text style={styles.price1}>₹{JSON.parse(item).data.productPrice} / {JSON.parse(item).data.productpriceunit}</Text>
                                            {
                                                JSON.parse(item).wholesale &&
                                                <Text
                                                    style={styles.wholesale}
                                                >Wholesale</Text>
                                            }
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
                                <Text style={styles.title}>{userdata?.name}</Text>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={styles.title}>Phone :</Text>
                            </View>

                            <View style={styles.right}>
                                <Text style={styles.title}>{userdata?.phone}</Text>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={styles.title}>Address :</Text>
                            </View>

                            <View style={styles.right}>
                                <AntDesign name="edit" size={24} color="black" style={styles.qty}
                                    onPress={() => {
                                        navigation.navigate('addresspage')
                                    }}
                                />
                                <Text style={styles.address}>
                                    {userdata?.address?.addressline1} ,
                                    {userdata?.address?.addressline2} ,
                                    {userdata?.address?.addressline3} ,
                                    {userdata?.address?.pincode}
                                </Text>
                                {/* editicon */}
                            </View>

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
                            <Text style={styles.btntext} onPress={() => placenow()}>Proceed For Payment</Text>
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
        flex: 1,
    },
    container: {
        flexDirection: 'column',
        // alignItems: 'center',
        marginTop: 100,
        paddingHorizontal: 20,
    },
    head1: {
        fontSize: 30,
        fontWeight: '300',
        color: col1,
        margin: 10,
        textAlign: 'center'
    },
    wholesale: {
        fontSize: 10,
        fontWeight: 'bold',
        color: col1,
        margin: 10,
        textAlign: 'center',
        borderColor: col1,
        borderWidth: 1,
        borderRadius: 5,
        padding: 2,
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
        marginVertical: 5,
        // elevation: 1,
        backgroundColor: 'white',
        // padding: 10,
        borderRadius: 10,
        width: '90%',
        alignSelf: 'center',
    },

    qty: {
        width: 25,
        height: 25,
        backgroundColor: col1,
        borderRadius: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: 10,
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#5A5A5A'
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
        marginRight: 10,
        color: '#5A5A5A'
    },
    price1: {
        fontSize: 12,
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
        justifyContent: 'flex-end',
    },
    totalprice: {
        fontSize: 12,
        fontWeight: 'bold',
        borderRadius: 20,
        padding: 5,
        paddingHorizontal: 20,
        color: col1,
        backgroundColor: '#111111',
    },
    btntext: {
        fontSize: 12,
        fontWeight: 'bold',
        color: col1,
        margin: 10,
        color: 'white',
        textAlign: 'center',
    },
    boxout: {
        flexDirection: 'row',
        width: '90%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    boxtxt: {
        fontSize: 16,
        width: '30%',
        // borderColor: col1,
        // borderWidth: 1,
        padding: 10,
        // textAlign: 'left',
        color: '#5A5A5A',
    },
    btn1: {
        backgroundColor: col1,
        borderRadius: 20,
        margin: 10,
        paddingHorizontal: 20,
    },
    address: {
        fontSize: 12,
        // backgroundColor: '#111111',
        color: '#5A5A5A',
        fontWeight: '500',
        width: '70%',
        alignSelf: 'center',
    },
    userdataout: {
        flexDirection: 'column',
        width: '90%',
        alignSelf: 'center',

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