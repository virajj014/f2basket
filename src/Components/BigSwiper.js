import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Swiper from 'react-native-swiper'

import { col1, col2 } from '../styles/colors'
const BigSwiper = ({ data }) => {

    // useEffect(() => {
    //     // console.log(data)
    // }, [])
    return (
        <View>
            <View style={styles.offerSlider}>
                <Swiper autoplay={true} autoplayTimeout={5} showsButtons={true}
                    dotColor={col1} activeDotColor={col2}
                    nextButton={<Text style={styles.buttonText}>›</Text>}
                    prevButton={<Text style={styles.buttonText}>‹</Text>}
                >
                    {data.map((item) => {
                        return (
                            <View style={styles.slide} key={item.id}>
                                <Image source={{uri : item.sliderImageUrl}} style={styles.image} />
                            </View>
                        )
                    })}
                </Swiper>
            </View>
        </View>
    )
}

export default BigSwiper

const styles = StyleSheet.create({
    offerSlider: {
        width: '100%',
        height: 200,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    slide: {
        width: '100%',
        height: 200,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    buttonText: {
        color: col2,
        fontSize: 40,
        fontWeight: '500',
        backgroundColor: 'white',
        borderRadius: 20,
        width: 40,
        height: 40,
        textAlign: 'center',
        lineHeight: 40,
    }
})