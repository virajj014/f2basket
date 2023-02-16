import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { navbtn, navbtnin, navbtnout } from '../../styles/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { col1 } from '../../styles/colors';
import firestore from '@react-native-firebase/firestore';
import Card1 from '../../Components/cards/Card1';
import Footer from '../../Components/Footer';
import BottomNav from '../../Components/BottomNav';
const Category = ({ navigation, route }) => {
    const { category } = route.params;
    const [categoryProducts, setCategoryProducts] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const getdata = () => {
        setLoading(true)
        const productRef = firestore().collection('productData')
        productRef.where('productCategory', '==', category).get().then((querySnapshot) => {
            setLoading(false)
            const data = querySnapshot.docs.map((doc) => doc.data())
            console.log(data)
            setCategoryProducts(data)
            setLoading(false)
        })
            .catch((error) => {
                setLoading(false)
                console.log(error)
            })
    }
    React.useEffect(() => {
        getdata()
    }, [])

    return (
        <View style={styles.fullbg}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={navbtnout}>
                <View style={navbtn}>
                    <AntDesign name="back" size={24} color="black" style={navbtnin} />
                </View>
            </TouchableOpacity>

            {
                loading && <View style={styles.loadingcont}>
                    <ActivityIndicator size="large" color={col1} />
                </View>
            }
            <ScrollView>
                <Text style={styles.categoryhead}>{category == 'fruit' && 'Fruits' ||
                    category == 'plant' && 'Plants'
                    || category == 'flower' && 'Flowers'
                }</Text>
                <View style={styles.c1}>
                    {categoryProducts.map((item, index) => {
                        return (
                            <Card1 key={index} data={item} navigation={navigation} />
                        )
                    })}
                </View>
                <Footer />
            </ScrollView>

            <View style={styles.bottomnav}>
                <BottomNav navigation={navigation}/>
            </View>
        </View>
    )
}

export default Category

const styles = StyleSheet.create({
    categoryhead: {
        fontSize: 30,
        backgroundColor: col1,
        color: '#fff',
        textAlign: 'center',
        width: '60%',
        alignSelf: 'center',
        borderRadius: 30,
        padding: 3,
        margin: 20,
    },
    loadingcont: {
        height: '80%',
        width: '100%',
        justifyContent: 'center',
    },
    c1: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    bottomnav: {
        position: 'absolute',
        bottom: 0,
    },
    fullbg: {
        backgroundColor: 'white',
        minHeight: '100%',
    },
})