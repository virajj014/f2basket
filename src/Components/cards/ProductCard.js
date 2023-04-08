import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { col1, col2 } from '../../styles/colors'

const ProductCard = ({ item }) => {
    // console.log(item)
    return (
        <View style={styles.card}>
            {
                item?.productAvailability === 'OUT OF STOCK' ?
                    <View style={styles.outofstock}>
                        {/* productAvailability */}
                        <Text
                            style={styles.outofstocktxt}
                        >Out of Stock</Text>
                    </View>
                    : null
            }
            <View style={styles.s1}>
                <Image source={{
                    uri: item.productImageUrl
                }} style={styles.cardimgin} />
            </View>
            <View style={styles.s2}>
                <Text style={styles.txt1}
                    numberOfLines={2}
                >{item.productName}</Text>

                <View style={styles.s2in}>
                    <Text style={styles.txt2}>Rs.{item.productPrice}/-</Text>
                </View>

            </View>
            <View style={styles.s3}>
                <Text style={styles.buybtn}>
                    Buy
                </Text>
            </View>
        </View>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    card: {
        // backgroundColor: "aqua",
        width: 150,
        // height: 170,
        height: 170,
        margin: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e8e8e8',
        backgroundColor: 'white',
        overflow: 'hidden',
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
    cardimgin: {
        width: "100%",
        height: 90,
        borderRadius: 10,
        resizeMode: 'contain',
    },
    s2: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'aqua',
    },
    txt1: {
        fontSize: 12,
        color: col2,
        marginHorizontal: 5,
        // width: 150,
        textAlign: 'center'
    },
    txt2: {
        fontSize: 15,
        color: col1,
        textAlign: 'center',
        width: '100%',
        // backgroundColor: '#e8e8e8',
    },
    s2in: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5,

    },
    s3: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    buybtn: {
        backgroundColor: col1,
        color: 'white',
        paddingHorizontal: 5,
        paddingVertical: 2,
        fontSize: 16,
        borderRadius: 10,
        width: '100%',
        textAlign: 'center',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    }
})