import { Image, StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { col2 } from '../styles/colors'

const Offers = ({ offers, title }) => {

    return (
        <View
            style={styles.container}
        >
            <Text style={styles.cardouthead}>
                {title}
            </Text>
            <FlatList
                data={offers}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                

                renderItem={({ item }) => (
                    <View
                        style={styles.card}
                    >
                        <Image style={styles.image} source={{ uri: item.sliderImageUrl }} />
                    </View>
                )}
                keyExtractor={item => item.id}
            />

        </View>
    )
}

export default Offers

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    cardouthead: {
        color: col2,
        width: '90%',
        fontSize: 25,
        fontWeight: '300',
        borderRadius: 10,
        marginHorizontal: 5,
    },
    card: {
        width: 200,
        height: 200,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
})