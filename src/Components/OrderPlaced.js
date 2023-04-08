import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { navbtn, navbtnin, navbtnout } from '../styles/style';

const OrderPlaced = ({ navigation }) => {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('cart')} style={navbtnout}>
                <View style={navbtn}>
                    <AntDesign name="back" size={24} color="black" style={navbtnin} />
                </View>
            </TouchableOpacity>
            <Text>OrderPlaced</Text>
        </View>
    )
}

export default OrderPlaced

const styles = StyleSheet.create({})