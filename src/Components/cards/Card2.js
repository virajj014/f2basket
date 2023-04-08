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
            <TouchableOpacity onPress={openProductPage}
                style={{ flexDirection: 'row', alignItems: 'center', flex: 1 ,gap:5}}
            >
                <Image source={{ uri: data.data.productImageUrl }} style={styles.c11} />

                <Text style={styles.qty}>{data.productquantity}</Text>
                <Text style={styles.txt1}>{data.data.productName}</Text>
                <Text
                    style={styles.txt2}
                >
                    Rs. {data.productquantity * data.data.productPrice}
                </Text>

                {
                    data.wholesale &&
                    <Text
                        style={styles.wholesale}
                    >Wholesale</Text>
                }
            </TouchableOpacity>

            <AntDesign name="close" size={20} color={col1} onPress={deleteItem} style={styles.deleteicon} />
        </View>
    )
}

export default Card2



const styles = StyleSheet.create({
    c1: {
        width: '95%',
        alignSelf: 'center',
        borderRadius: 10,
        elevation: 5,
        backgroundColor: '#fff',
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        marginVertical: 5,
        paddingRight: 10,
        gap: 5,
        paddingHorizontal: 5,
    },
    c11: {
        width: 30,
        height: 30,
        borderRadius: 5,
        resizeMode: 'contain',
        margin: 5,
        borderColor: col1,
        borderWidth: 1,
    },


    qty: {
        fontSize: 12,
        color: '#000',
        backgroundColor: '#111111',
        borderRadius: 35,
        color: '#fff',
        width: 25,
        textAlign: 'center',
        height: 25,
        textAlignVertical: 'center',
    },
    txt1: {
        fontSize: 14,
        color: col1,
        fontWeight: 'bold',
    },
    txt2: {
        fontSize: 15,
        color: '#000',
        textAlign: 'right',
        marginLeft: 5,
    },
    btn: {
        fontSize: 16,
        alignSelf: 'flex-end',
        // backgroundColor: col1,
    },
    deleteicon: {
        backgroundColor: '#111111',
        borderRadius: 25,
        width: 25,
        height: 25,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: 2,
        padding: 5,
        fontSize: 15,
        position: 'absolute',
        right: 10,
    },
    wholesale: {
        fontSize: 12,
        color: '#fff',
        backgroundColor: col1,
        borderRadius: 5,
        padding: 2,
        paddingHorizontal: 15,
        textAlign: 'center',
    }
})