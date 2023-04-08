import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HomeHeadNav from '../../Components/HomeHeadNav'
import BottomNav from '../../Components/BottomNav'
import { col1 } from '../../styles/colors'
import { navbtn, navbtnin, navbtnout } from '../../styles/style'
import AntDesign from 'react-native-vector-icons/AntDesign';
const TrackOrders = ({ navigation }) => {
  const [orders, setOrders] = useState([])


  const getorders = async () => {
    AsyncStorage.getItem('loggeduser')
      .then((userdata) => {
        userdata = JSON.parse(userdata)
        // console.log(userdata.user)
        const ordersRef = firestore().collection('Orders').where('orderphone', '==', userdata.user.phone);
        ordersRef.onSnapshot(snapshot => {
          setOrders(snapshot.docs.map(doc => {
            return { ...doc.data(), id: doc.id }
          }))
        })
      })


  }

  React.useEffect(() => {
    getorders()
  }, [])



  const convertDate = (date) => {
    console.log(date)
    // datetype is 1675168815214
    // console.log(date.seconds)
    const newdate = new Date(parseInt(date))
    // console.log(newdate)
    return newdate.toDateString()
  }


  const cancelOrder = (orderitem) => {
    // console.log(orderitem)
    const orderRef = firestore().collection('Orders').doc(orderitem.id);
    // console.log(orderRef)
    orderRef.update({
      orderstatus: 'cancelled'
    })
    getorders();
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={navbtnout}>
        <View style={navbtn}>
          <AntDesign name="back" size={24} color="black" style={navbtnin} />
        </View>
      </TouchableOpacity>
      <View style={styles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>


      <ScrollView style={styles.containerin}>
        <Text style={styles.head1}>Track Orders</Text>
        <View>
          {orders.sort(
            (a, b) => b.orderdate - a.orderdate
          ).map((order, index) => {
            return (
              <View style={styles.order} key={index}>
                <Text style={styles.orderindex}>{index + 1}</Text>
                <Text style={styles.ordertxt2}>order id : {order.id}</Text>
                <Text style={styles.ordertxt2}>order date : {convertDate(order.orderdate)}</Text>
                {order.orderstatus == 'ontheway' && <Text style={styles.orderotw}>Your order is on the way </Text>}
                {order.orderstatus == 'delivered' && <Text style={styles.orderdelivered}>Your order is delivered </Text>}
                {order.orderstatus == 'cancelled' && <Text style={styles.ordercancelled}>Your order is cancelled </Text>}
                {order.orderstatus == 'pending' && <Text style={styles.orderpending}>Your order is pending </Text>}


                <View style={styles.row1}>
                  <Text style={styles.ordertxt1}>Delivery Agent name & contact</Text>
                  {
                    order.deliveryboy_name ? <Text style={styles.ordertxt2}>{order.deliveryboy_name} : {order.deliveryboy_contact}</Text> : <Text style={styles.ordertxt2}>Not Assigned</Text>
                  }
                  {
                    order.deliveryboy_phone ? <Text style={styles.ordertxt2}>{order.deliveryboy_phone}</Text> : null
                  }
                </View>


                <ScrollView style={styles.c1}>
                  {
                    order.orderdata.map((item, index) => {
                      return (
                        <View style={styles.rowout} key={index}>
                          <View style={styles.row}>
                            <View style={styles.left}>
                              <Text style={styles.qty}>{JSON.parse(item).productquantity}</Text>
                              <Text style={styles.title}>{JSON.parse(item).data.productName}</Text>
                              <Text style={styles.price1}>₹{JSON.parse(item).data.productPrice}</Text>

                            </View>

                            <View style={styles.right}>
                              {
                                JSON.parse(item).wholesale &&
                                <Text
                                  style={styles.wholesale}
                                >Wholesale</Text>
                              }
                              <Text style={styles.totalprice}>₹{parseInt(JSON.parse(item).productquantity) * parseInt(JSON.parse(item).data.productPrice)}</Text>
                            </View>
                          </View>
                        </View>
                      )
                    })
                  }
                </ScrollView>

                <Text style={styles.total}>Total: ₹{order.ordercost}</Text>
                {
                  order.orderstatus === 'Delivered' ? <Text style={styles.ordertxt3}>Thank you for ordering with us</Text> : null
                }
                {/* {
                  order.orderstatus === 'cancelled' ? <Text style={styles.ordertxt3}>Sorry for the inconvenience</Text> : null
                } */}
                {
                  order.orderstatus != 'cancelled' && order.orderstatus != 'delivered' ?
                    <TouchableOpacity style={styles.cancelbtn} onPress={() => cancelOrder(order)}>
                      <Text style={styles.cencelbtnin}>Cancel Order</Text>
                    </TouchableOpacity>
                    : null
                }
              </View>
            )
          })}
        </View>
        <View
          style={{height: 100}}
        ></View>
      </ScrollView>
    </View>
  )
}

export default TrackOrders

const styles = StyleSheet.create({
  container: {
    // marginTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  bottomnav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    zIndex: 20,
  },
  containerin: {
    marginTop: 10,
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  head1: {
    fontSize: 30,
    color: col1,
    textAlign: 'center',
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  rowout: {
    flexDirection: 'column',
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  row1: {
    flexDirection: 'column',
    margin: 10,
    // elevation: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    padding: 2,
    borderRadius: 20,
    // paddingHorizontal: 10,
    maxWidth: '80%',
    flexWrap: 'wrap',
    gap: 10,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  wholesale: {  fontSize: 12,
    color: '#fff',
    backgroundColor: col1,
    borderRadius: 5,
    padding: 2,
    paddingHorizontal: 15,
    textAlign: 'center',},
  qty: {
    backgroundColor: col1,
    color: '#111111',
    // marginRight: 10,
    width: 30,
    textAlign: 'center',
    borderRadius: 30,
    height: 30,
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 12,
    color: col1,
    marginRight: 10,

  },
  price1: {
    fontSize: 12,
    color: col1,
    marginRight: 10,
  },
  totalprice: {
    fontSize: 16,
    // color: col1,
    marginRight: 10,
    color: '#5A5A5A'
  },
  total: {
    fontSize: 20,
    color: col1,
    textAlign: 'right',
    marginVertical: 10,
    marginRight: 20,
    color: '#5A5A5A'

  },
  order: {
    margin: 10,
    elevation: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,

  },
  ordertxt1: {
    fontSize: 13,
    color: col1,
    textAlign: 'center',
    marginVertical: 5,
    color: '#5A5A5A'

  },
  ordertxt2: {
    fontSize: 13,
    textAlign: 'center',
    marginVertical: 5,
    fontWeight: 'bold',
    color: '#5A5A5A'

  },
  ordertxt3: {
    fontSize: 13,
    textAlign: 'center',
    marginVertical: 5,
    color: '#5A5A5A'
  },
  orderindex: {
    fontSize: 20,
    color: '#fff',
    backgroundColor: col1,
    textAlign: 'center',
    borderRadius: 30,
    width: 30,
    height: 30,
    position: 'absolute',
    top: 10,
    left: 10,
  },

  cancelbtn: {
    backgroundColor: col1,
    padding: 5,
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  cencelbtnin: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  orderstatus: {
    // fontSize: 20,
  },
  orderstatusin: {},
  orderotw: {
    fontSize: 12,
    backgroundColor: 'orange',
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  orderdelivered: {
    fontSize: 12,
    backgroundColor: 'green',
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  ordercancelled: {
    fontSize: 12,
    backgroundColor: 'red',
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  orderpending: {
    fontSize: 12,
    backgroundColor: 'yellow',
    color: 'grey',
    textAlign: 'center',
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  }
})