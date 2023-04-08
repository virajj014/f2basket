import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { navbtn, navbtnin, navbtnout } from '../styles/style';
import LottieView from 'lottie-react-native';
import { col1, col2 } from '../styles/colors';

const OrderPlaced = ({ navigation }) => {
    return (
        <View
            style={{ flex: 1, alignItems: 'center', height: '100%', width: '100%', justifyContent: 'center' }}
        >
            <TouchableOpacity onPress={() => navigation.navigate('cart')} style={navbtnout}>
                <View style={navbtn}>
                    <AntDesign name="back" size={24} color="black" style={navbtnin} />
                    {/* <LottieView
                        style={{ width: 300, height: 300, alignItem: "center" }}
                        source={require('../assets/ordersuccess.json')}
                        autoPlay
                        loop
                    /> */}
                    {/* <LottieView
                        style={styles.fullscreen}
                        source={require('../assets/ontheway.json')}
                        autoPlay
                        loop
                    />
                    <Text>Order Placed and Will be delivered soon</Text> */}
                </View>
            </TouchableOpacity>


            <LottieView
                style={styles.fullscreen}
                source={require('../assets/ontheway.json')}
                autoPlay
                loop
            />

            <View
                style={
                    styles.bottomfull
                }
            >
                <Text
                    style={styles.t1}
                >Order Placed and Will be delivered soon</Text>
                <Text
                    style={styles.t2}

                    onPress={() => {
                        navigation.navigate('trackorders')
                    }}
                >Track Order</Text>
            </View>
        </View>
    )
}

export default OrderPlaced

const styles = StyleSheet.create({
    fullscreen: {
        // width: '100%',
        height: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        bottom: 0,
    },
    bottomfull: {
        width: '80%',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 150,
        borderRadius: 10,
        elevation: 2,
        padding: 20,
    },
    t1: {
        fontSize: 15,
        color: col2,
        fontWeight: '500',
        textAlign: 'center',
    },
    t2: {
        fontSize: 18,
        backgroundColor: col1,
        color: 'white',
        fontWeight: '500',
        textAlign: 'center',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    }
})