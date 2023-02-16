import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { col1 } from '../../styles/colors'

const Card1 = ({ navigation, data }) => {

    useEffect(() => {
        console.log(data)
    }, [])


    const openProductPage = () => {
        // console.log('clicked ', item)
        navigation.navigate('productpage', data)
    }
    return (
        <View style={styles.c1}>
            <Image source={{ uri: data.productImageUrl }} style={styles.c11} />
            <View styles={styles.c12}>
                <Text style={styles.txt1}>{data.productName}</Text>
                <Text style={styles.txt2}>Rs. {data.productPrice} / {data.productpriceunit}</Text>
                <TouchableOpacity 
                    onPress={openProductPage}
                >
                    <Text style={styles.btn}
                    >View</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Card1

const styles = StyleSheet.create({
    c1: {
        width: '95%',
        alignSelf: 'center',
        borderRadius: 30,
        // padding: 10,
        elevation: 5,
        backgroundColor: '#fff',
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        height: 150,
        overflow: 'hidden',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    c11: {
        width: 200,
        height: '100%',
        borderRadius: 20,
    },
    txt1: {
        fontSize: 20,
        color: '#000',
        // marginLeft: 10,
        textAlign: 'right',
        width: '100%',
        paddingRight: 10,
        color: col1
    },
    txt2: {
        fontSize: 17,
        alignSelf: 'flex-end',
        paddingRight: 10,
        color: 'green'
    },
    btn: {
        backgroundColor: col1,
        color: '#fff',
        padding: 5,
        borderRadius: 10,
        textAlign: 'center',
        width: 100,
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: 10,
        fontSize: 17,
        color: '#111111'
    }
})