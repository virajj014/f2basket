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
          setOrders(snapshot.docs.map(doc => doc.data()))
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
    const orderRef = firestore().collection('Orders').doc(orderitem.orderid);
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
                <Text style={styles.ordertxt2}>order id : {order.orderid}</Text>
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
                {
                  order.orderstatus === 'cancelled' ? <Text style={styles.ordertxt3}>Sorry for the inconvenience</Text> : null
                }
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
    marginBottom: 100,
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
    elevation: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  row1: {
    flexDirection: 'column',
    margin: 10,
    elevation: 10,
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
    padding: 5,
    borderRadius: 20,
    paddingHorizontal: 10,
    maxWidth: '80%',
    flexWrap: 'wrap',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qty: {
    backgroundColor: col1,
    color: '#111111',
    marginRight: 10,
    width: 30,
    textAlign: 'center',
    borderRadius: 30,
    height: 30,
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 15,
    color: col1,
    marginRight: 10,

  },
  price1: {
    fontSize: 15,
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
    elevation: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,

  },
  ordertxt1: {
    fontSize: 20,
    color: col1,
    textAlign: 'center',
    marginVertical: 10,
    color: '#5A5A5A'

  },
  ordertxt2: {
    fontSize: 17,
    color: col1,
    textAlign: 'center',
    marginVertical: 5,
    fontWeight: 'bold',
    color: '#5A5A5A'

  },
  orderindex: {
    fontSize: 20,
    color: '#fff',
    backgroundColor: col1,
    textAlign: 'center',
    borderRadius: 30,
    padding: 5,
    width: 30,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  ordertxt3: {
    fontSize: 17,
    color: '#111111',
    textAlign: 'center',
    marginVertical: 5,
    borderColor: col1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  cancelbtn: {
    backgroundColor: col1,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: 'center',

  },
  cencelbtnin: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  orderstatus: {
    // fontSize: 20,
  },
  orderstatusin: {},
  orderotw: {
    fontSize: 20,
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
    fontSize: 20,
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
    fontSize: 20,
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
    fontSize: 20,
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