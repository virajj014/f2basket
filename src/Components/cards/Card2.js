import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { col1 } from '../../styles/colors'
import AntDesign from 'react-native-vector-icons/AntDesign';
const Card2 = ({ navigation, data, deleteItem }) => {

    useEffect(() => {
        console.log(data.data.productquantity)
    }, [])


    const openProductPage = () => {
        // console.log('clicked ', item)
        navigation.navigate('productpage', data.data)
    }
    return (
        <View style={styles.c1}>
            <Image source={{ uri: data.data.productImageUrl }} style={styles.c11} />
            <View styles={styles.c12}>
                <View style={styles.c121}>
                    <AntDesign name="delete" size={20} color={col1} onPress={deleteItem} style={styles.deleteicon} />
                    <Text style={styles.qty}>{data.productquantity}</Text>
                    <Text style={styles.txt1}>{data.data.productName}</Text>
                </View>
                <Text style={styles.txt2}>Rs. {data.data.productPrice} / {data.data.productpriceunit}</Text>
                <TouchableOpacity
                    onPress={openProductPage}
                >
                    <Text
                        style={styles.btn}
                    >
                        Rs. {data.productquantity * data.data.productPrice}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Card2



const styles = StyleSheet.create({
    c1: {
        width: '95%',
        alignSelf: 'center',
        borderRadius: 30,
        elevation: 5,
        backgroundColor: '#fff',
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
        paddingRight: 10,
    },
    c11: {
        width: '30%',
        height: '100%',
    },
    c12: {
        width: '70%',
        flexDirection: 'column',
    },
    c121: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        paddingVertical: 5,
        justifyContent: 'space-between'
    },
    qty: {
        fontSize: 20,
        color: '#000',
        marginRight: 10,
        backgroundColor: '#111111',
        borderRadius: 35,
        color: '#fff',
        width: 35,
        textAlign: 'center',
        height: 35,
        textAlignVertical: 'center',
    },
    txt1: {
        fontSize: 17,
        color: col1,
        fontWeight: 'bold',
    },
    txt2: {
        fontSize: 15,
        color: '#000',
        textAlign: 'right',
    },
    btn: {
        fontSize: 20,
        alignSelf: 'flex-end',
        backgroundColor: col1,
        padding: 5,
        borderRadius: 20,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    deleteicon: {
        backgroundColor: '#111111',
        borderRadius: 35,
        width: 35,
        height: 35,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: 2,
    }
})