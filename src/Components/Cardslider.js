import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { col1, col2, col3 } from '../styles/colors'
import { nonveg, veg } from '../styles/style'

const Cardslider = ({ title, data, navigation }) => {
    const openProductPage = (item) => {
        // console.log('clicked ', item)
        navigation.navigate('productpage', item)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.cardouthead}>
                {title}
            </Text>
            <FlatList style={styles.cardsout}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity key={item.index}
                        onPress={() => { openProductPage(item) }}>
                        <View style={styles.card}>
                            <View style={styles.s1}>
                                <Image source={{
                                    uri: item.productImageUrl
                                }} style={styles.cardimgin} />
                            </View>
                            <View style={styles.s2}>
                                <Text style={styles.txt1}>{item.productName}</Text>

                                <View style={styles.s2in}>
                                    <Text style={styles.txt2}>Rs.{item.productPrice}/-</Text>
                                    {item.productType == 'veg' ? <Text style={veg}></Text> : <Text style={nonveg}></Text>}
                                </View>

                            </View>
                            <View style={styles.s3}>
                                <Text style={styles.buybtn}>
                                    Buy
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default Cardslider

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    //card
    cardouthead: {
        color: col2,
        width: '90%',
        fontSize: 25,
        fontWeight: '300',
        borderRadius: 10,
        marginHorizontal: 5,
    },
    cardsout: {
        width: '100%',
        // backgroundColor: 'red',
    },
    card: {
        // backgroundColor: "aqua",
        width: 150,
        height: 170,
        margin: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e8e8e8',
        backgroundColor: 'white',
    },
    cardimgin: {
        width: "100%",
        height: 70,
        borderRadius: 10,
    },
    s2: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'aqua',
    },
    txt1: {
        fontSize: 15,
        color: col2,
        marginHorizontal: 5,
        // width: 150,

    },
    txt2: {
        fontSize:  17,
        color: col1,
        marginRight: 10,
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