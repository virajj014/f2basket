import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import { col1 } from '../../styles/colors'

const Card1 = ({ navigation, data, type }) => {

    // useEffect(() => {
    //     // console.log(data)
    // }, [])


    const openProductPage = () => {
        // console.log('clicked ', item)
        navigation.navigate('productpage', data)
    }
    const openWholeSaleProductPage = () => {
        // console.log('clicked ', item)
        navigation.navigate('WholeSaleProductPage', data)
    }
    return (
        <TouchableOpacity>
            {
                type === 'retail' ?
                    <View style={styles.c1}>
                        {
                            data?.productAvailability === 'OUT OF STOCK' ?
                                <View style={styles.outofstock}>
                                    {/* productAvailability */}
                                    <Text
                                        style={styles.outofstocktxt}
                                    >Out of Stock</Text>
                                </View>
                                : null
                        }
                        <Image source={{ uri: data.productImageUrl }} style={styles.c11} />
                        <View styles={styles.c12}>
                            <Text style={styles.txt1}>{data.productName}</Text>
                            <Text style={styles.txt2}>Rs. {data.productPrice} / {data.productpriceunit}</Text>
                        </View>
                        <Text style={styles.btn} onPress={() => {
                            data?.productAvailability === 'OUT OF STOCK' ?
                            ToastAndroid.show('OUT OF STOCK', ToastAndroid.SHORT)
                            :
                            openProductPage()

                        }
                        }
                        >+</Text>
                    </View>
                    :
                    <View style={styles.c1}>
                        {
                            data?.productAvailability === 'OUT OF STOCK' ?
                                <View style={styles.outofstock}>
                                    {/* productAvailability */}
                                    <Text
                                        style={styles.outofstocktxt}
                                    >Out of Stock</Text>
                                </View>
                                : null
                        }
                        <Image source={{ uri: data.productImageUrl }} style={styles.c11} />
                        <View styles={styles.c12}>
                            <Text style={styles.txt1}>{data.productName}</Text>
                            <Text style={styles.txt2}>Rs. {data.productwholesaleprice} / {data.productpriceunit}</Text>
                            <Text style={styles.txt2}>min - {data.productwholesalequantity}</Text>
                        </View>
                        <Text style={styles.btn} onPress={() => {
                            data?.productAvailability === 'OUT OF STOCK' ?
                                ToastAndroid.show('OUT OF STOCK', ToastAndroid.SHORT)
                                :
                                openWholeSaleProductPage()
                        }}
                        >+</Text>
                    </View>
            }
        </TouchableOpacity>
    )
}

export default Card1

const styles = StyleSheet.create({
    c1: {
        width: 100,
        borderColor: '#EDEDED',
        borderWidth: 1,

        borderRadius: 10,
        margin: 10,
        overflow: 'hidden',
        justifyContent: 'space-evenly',
        position: 'relative',
        zIndex: 0
    },
    outofstock: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'white',
        color: 'white',
        width: '100%',
        height: '100%',
        zIndex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.6,
    },
    outofstocktxt: {
        color: 'black',
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 12,
        fontWeight: '400',
        position: 'absolute',
        top: '50%',
        transform: [{ translateY: -50 }],
        padding: 5,
        borderRadius: 5,

    },
    c11: {
        width: '100%',
        height: 100,
        borderRadius: 10,
    },
    txt1: {
        padding: 5,
        fontSize: 12,
        color: 'black',
        textAlign: 'center',
    },
    txt2: {
        paddingHorizontal: 5,
        fontSize: 13,
        color: 'grey',
        textAlign: 'center',
    },
    btn: {
        width: 30,
        height: 30,
        backgroundColor: col1,
        color: '#fff',
        textAlign: 'center',
        borderRadius: 15,
        position: 'absolute',
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        padding: 0,
        right: 5,
        top: 80,
        fontSize: 17,
    }
})