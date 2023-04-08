import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity ,ToastAndroid} from 'react-native'
import React from 'react'
import { col1, col2, col3 } from '../styles/colors'
import { nonveg, veg } from '../styles/style'
import ProductCard from './cards/ProductCard'

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
                        onPress={() => { 
                            item?.productAvailability === 'OUT OF STOCK'? 
                            ToastAndroid.show("OUT OF STOCK", ToastAndroid.SHORT)
                            :
                            openProductPage(item)
                         }}>
                        <ProductCard item={item} />
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
  
})