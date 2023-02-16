import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import cod from '../assets/payments/cod.png'
import paytm from '../assets/payments/paytm.png'
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native';

const Payments = ({ route, navigation }) => {
    const { orderdata } = route.params;
    const [loading, setLoading] = React.useState(false);
    console.log(orderdata);

    const placenow = (paymenttype) => {
        // console.log(paymenttype);
        if (paymenttype != 'PAYTM' && paymenttype != 'COD') {
            alert('Please Select A Payment Method');
            return;
        }
        let paymentstatus = '';
        if (paymenttype == 'COD') {
            paymentstatus = 'pending';
        }
        else if (paymenttype == 'PAYTM'){
            paymentstatus = 'paid';
        }
        setLoading(true);
        // console.log(paymentstatus);
        const docRef = firestore().collection('Orders').doc(new Date().getTime().toString());
        docRef.set({
            orderdata: orderdata.orderdata,
            ordercost: orderdata.ordercost,
            orderid: orderdata.orderid,
            orderstatus: 'pending',
            orderdate: orderdata.orderdate,
            orderaddress: orderdata.orderaddress,
            orderphone: orderdata.orderphone,
            ordername: orderdata.ordername,
            orderpayment: paymenttype,
            paymentstatus: paymentstatus,
            paymenttotal: orderdata.paymenttotal,
        })
            .then(() => {
                setLoading(false);
                alert('Order Placed Successfully');
                navigation.navigate('trackorders');
            })
            .catch((error) => {
                setLoading(false);
                alert(error);
            });
    }


    // const placenow = (paymenttype) => {
    //     console.log(paymenttype);
    // }
    return (
        <View>
            <Text style={styles.t1}>Select A Payment Method</Text>
            <View style={styles.v1}>

                <TouchableOpacity onPress={() => 
                {alert('Paytm Payment Gateway is not available right now.')}}>
                    <View style={styles.v11}>
                        <Image source={paytm} style={styles.img1} />
                        <Text style={styles.t2}>Paytm</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => placenow('COD')}>
                    <View style={styles.v11}>
                        <Image source={cod} style={styles.img1} />
                        <Text style={styles.t2}>Cash On Delivery</Text>
                    </View>
                </TouchableOpacity>

            </View>
            <Text style={styles.cancel}
                onPress={
                    () => {
                        navigation.goBack();
                    }
                }
            >
                {
                    loading ? 'Placing Order...' : 'Cancel'
                }
            </Text>
        </View>
    )
}

export default Payments

const styles = StyleSheet.create({
    t1: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 30,
        textAlign: 'center',
        color: '#333',
    },
    v1: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 40,
    },
    v11: {
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        padding: 20,
        borderRadius: 10,
        elevation: 10,
        width: 150,
        height: 180,
    },
    img1: {
        height: '60%',
        width: '60%',
        resizeMode: 'contain',
    },
    t2: {
        fontSize: 16,
        marginVertical: 20,
        color: '#333',
    },
    cancel: {
        backgroundColor: 'red',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
        borderRadius: 10,
        marginHorizontal: 20,
    },
});
