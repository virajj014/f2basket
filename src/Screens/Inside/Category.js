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
    const [wholesaleproducts, setwholesaleproducts] = React.useState([])
    const [showwholesale, setshowwholesale] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const getdata = () => {
        setLoading(true)
        const productRef = firestore().collection('productData')
        productRef.where('productCategory', '==', category).get().then((querySnapshot) => {
            setLoading(false)
            const data = querySnapshot.docs.map((doc) => doc.data())
            // console.log(data)
            setCategoryProducts(data)
            setLoading(false)


            let wholesale = [];
            data.forEach((item) => {
                if (item.productwholesaleprice && item.productwholesalequantity) {
                    wholesale.push(item)
                }
            })
            setwholesaleproducts(wholesale)
            console.log('wholesale items', wholesale)
        })
            .catch((error) => {
                setLoading(false)
                // console.log(error)
            })
    }
    React.useEffect(() => {
        getdata()
    }, [])

    return (
        <View style={styles.fullbg}>
            <View
                style={styles.head}
            >
                <AntDesign name="back" size={24} color="black" style={styles.backicon}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.headtxt}>{category == 'fruit' && 'Fruits' ||
                    category == 'plant' && 'Plants'
                    || category == 'flower' && 'Flowers'
                }</Text>
            </View>


            {
                loading && <View style={styles.loadingcont}>
                    <ActivityIndicator size="large" color={col1} />
                </View>
            }
            <ScrollView>
                <View style={styles.tabs}>
                    {
                        showwholesale ?
                            <TouchableOpacity
                                onPress={() => setshowwholesale(false)}
                            >
                                <Text style={styles.tabtxt1}>Retail</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={() => setshowwholesale(false)}
                            >
                                <Text style={styles.tabtxt}>Retail</Text>
                            </TouchableOpacity>
                    }
                    {
                        showwholesale ? <TouchableOpacity
                            onPress={() => setshowwholesale(true)}
                        >
                            <Text style={styles.tabtxt}>Wholesale</Text>
                        </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={() => setshowwholesale(true)}
                            >
                                <Text style={styles.tabtxt1}>Wholesale</Text>
                            </TouchableOpacity>
                    }
                </View>
                {
                    !showwholesale ?
                        <View style={styles.c1}>
                            {categoryProducts.map((item, index) => {
                                return (
                                    <Card1 key={index} data={item} navigation={navigation} type="retail" />
                                )
                            })}
                        </View>
                        :
                        <View style={styles.c1}>
                            {wholesaleproducts.length > 0 ? wholesaleproducts.map((item, index) => {
                                return (
                                    <Card1 key={index} data={item} navigation={navigation} type="wholesale" />
                                )
                            })
                                :
                                <View
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            fontSize: 15,
                                            marginVertical: 20,
                                            color: 'grey'
                                        }}
                                    >No Wholesale Products</Text>
                                </View>
                            }

                        </View>
                }
                <Footer />
            </ScrollView>

            <View style={styles.bottomnav}>
                <BottomNav navigation={navigation} />
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
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        elevation: 10,
        gap: 20,
    },
    headtxt: {
        fontSize: 20,
        color: 'black',
    },
    backicon: {
        color: col1,

    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        marginVertical: 20,
    },
    tabtxt: {
        fontSize: 20,
        backgroundColor: col1,
        color: '#fff',
        textAlign: 'center',
        width: 150,
        alignSelf: 'center',
        borderRadius: 30,
        padding: 3,
    },
    tabtxt1: {
        fontSize: 20,
        color: 'black',
    },
    loadingcont: {
        height: '80%',
        width: '100%',
        justifyContent: 'center',
    },
    c1: {
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'center'
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