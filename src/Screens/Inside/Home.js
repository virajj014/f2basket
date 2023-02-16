import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { backbtn } from '../../styles/auth'
import Location from '../../Components/Location'
import BigSwiper from '../../Components/BigSwiper'
import Categories from '../../Components/Categories'
import HomeHeadNav from '../../Components/HomeHeadNav'
import firestore from '@react-native-firebase/firestore';
import Cardslider from '../../Components/Cardslider'
import Footer from '../../Components/Footer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Sidebar from './Sidebar'
import { col1 } from '../../styles/colors'
import { useRecoilState } from 'recoil'
import { sidebarState } from '../../Providers/sidebarProvider'
import BottomNav from '../../Components/BottomNav'
import style, { bottomnav } from '../../styles/style'
import { TextInput } from 'react-native-gesture-handler'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Card1 from '../../Components/cards/Card1'


let screenheight = Dimensions.get('window').height;
const Home = ({ navigation }) => {
  screenheight = Dimensions.get('window').height;

  // check login ------------------
  const [isloggedin, setisloggedin] = useState(null);
  const checklogin = async () => {
    const loggeduser = await AsyncStorage.getItem('loggeduser');
    if (loggeduser != null) {
      return JSON.parse(loggeduser);
    }
    else {
      return false
    }
  }

  useEffect(() => {
    checklogin().then((data) => {
      if (data) {
        navigation.navigate('Home')
        setisloggedin(true)
      }
      else {
        setisloggedin(false)
        navigation.navigate('Welcome')
      }
    })
      .catch((err) => {
        navigation.navigate('Welcome')
      })
  }, [])

  // -----------------------------

  // let swiperimages = [
  //   {
  //     id: 1,
  //     image: img1,
  //   },
  //   {
  //     id: 2,
  //     image: img2,
  //   },
  //   {
  //     id: 3,
  //     image: img3,
  //   },
  //   {
  //     id: 4,
  //     image: img4,
  //   },
  //   {
  //     id: 5,
  //     image: img5,
  //   },
  //   {
  //     id: 6,
  //     image: img6,
  //   },
  //   {
  //     id: 7,
  //     image: img7,
  //   }
  // ]


  const [swiperimages, setswiperimages] = useState([]);
  const getswiperimages = async () => {
    // collection name is 'sliderData'
    let temp = [];

    const sliderRef = firestore().collection('sliderData')
    sliderRef.onSnapshot(snapshot => {
      temp = snapshot.docs.map(doc => doc.data())
      // console.log(temp)
      setswiperimages(temp)
    })
  }

  useEffect(() => {
    getswiperimages()
  }, [])
  // GETTING DATA FROM FIREBASE
  const [productData, setproductData] = useState([]);
  const [Catergory1, setCatergory1] = useState([]);
  const [Catergory2, setCatergory2] = useState([]);
  const [Catergory3, setCatergory3] = useState([]);
  const productRef = firestore().collection('productData')
  useEffect(() => {
    productRef.onSnapshot(snapshot => {
      setproductData(snapshot.docs.map(doc => doc.data()))
      // console.log(snapshot.docs.map(doc => doc.data()))
    }
    )
  }, [])
  useEffect(() => {
    setCatergory1(productData.filter((item) => item.productCategory == 'fruit'))
    setCatergory2(productData.filter((item) => item.productCategory == 'plant'))
    setCatergory3(productData.filter((item) => item.productCategory == 'flower'))
  }, [productData])
  // 




  // sidebar-----------------
  const [sidebar, setsidebar] = useRecoilState(sidebarState);

  // -------------------------


  const [searchval, setsearchval] = useState('');
  return (
    <View style={styles.fullbg}>
      <ScrollView style={styles.fullbg}>
        {
          isloggedin == true &&
          <View style={styles.fullbg}>
            {
              sidebar &&
              <View style={styles.sidebarout}>
                <Sidebar navigation={navigation} />
              </View>
            }

            <Location />
            <HomeHeadNav navigation={navigation} />
            <View style={styles.searchbar}>
              <TextInput placeholder="Search" style={styles.searchinput}
                onChangeText={(text) => setsearchval(text)}
              />
              {/* search icon */}
              <MaterialIcons name="search" size={30} style={styles.searchicon} />
            </View>
            {
              searchval.length == 0 &&
              <View style={styles.fullbg}>
                <BigSwiper data={swiperimages} />
                <Categories navigation={navigation} />
                <Cardslider title={"Today's Special"} data={productData} navigation={navigation} />
                <Cardslider title={"Fruits"} data={Catergory1} navigation={navigation} />
                <Cardslider title={"Plants"} data={Catergory2} navigation={navigation} />
                <Cardslider title={"Flowers"} data={Catergory3} navigation={navigation} />
              </View>
            }
            {
              searchval.length > 0 &&
              <View style={styles.fullbg}>
                {
                  productData.filter((item) => item.productName.toLowerCase().includes(searchval.toLowerCase())).length > 0 ?
                    <View style={styles.results}>
                      {
                        productData.filter((item) => item.productName.toLowerCase().includes(searchval.toLowerCase())).map((item, index) => {
                          // <Card1 data={item} navigation={navigation} />
                          return (
                            <Card1 data={item} navigation={navigation} key={index} />
                          )
                        })
                      }
                    </View>
                    :
                    <View style={styles.notfound}>
                      <Text style={styles.notfoundtext}>No Product Found</Text>
                    </View>
                }
              </View>

            }
            <Footer />
          </View>
        }
        {
          isloggedin == null &&
          <View style={
            {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }
          }>

            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        }
      </ScrollView>
      <View style={bottomnav}>
        <BottomNav navigation={navigation} />
      </View>
    </View>

  )
}

export default Home

const styles = StyleSheet.create({
  sidebarout: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    left: 0,
    width: '50%',
    height: '100%',
    backgroundColor: col1,
  },
  searchbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    elevation: 10,
  },
  searchinput: {
    width: '90%',
    color: 'grey',
    fontSize: 20,
  },
  searchicon: {
    backgroundColor: '#fff',
    borderRadius: 50,
    color: col1,
    padding: 5,
    fontSize: 20,
    elevation: 5,
  },
  resultcont: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#fff',
  },
  bottomnav: {
    position: 'absolute',
    bottom: 0,
  },
  fullbg: {
    backgroundColor: 'white',
    minHeight: '100%',
  },
  notfound: {
    width: '100%',
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notfoundtext:{
    fontSize: 20,
    color: col1,
  }
})