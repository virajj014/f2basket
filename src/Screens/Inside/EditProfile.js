import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { navbtn, navbtnin, navbtnout } from '../../styles/style'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { col1, col2 } from '../../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const EditProfile = ({ navigation }) => {

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  const getuserdata = async () => {
    const user = await AsyncStorage.getItem('loggeduser')
    const userobj = JSON.parse(user).user
    // console.log(userobj)
    setName(userobj.name)
    setPhone(userobj.phone)
  }

  useEffect(() => {
    getuserdata()
  }, [])


  const handleSave = async () => {
    const usersCollection = firestore().collection('users')
    const user = await AsyncStorage.getItem('loggeduser')

    const userobj = await JSON.parse(user).user

    const userdoc = await usersCollection.doc(userobj.phone).update({
      name: name,
      address: address,
    })

    const userdoc1 = await usersCollection.doc(userobj.phone).get()
    // console.log(userdoc1.data())
    AsyncStorage.setItem('loggeduser', JSON.stringify({ user: userdoc1.data() }))
    alert('Profile Updated')
  }
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('settings')}
        style={navbtnout}>
        <View style={navbtn}>
          <AntDesign name="back" size={24} color="black" style={navbtnin} />
        </View>
      </TouchableOpacity>


      <ScrollView>
        <Text
          style={styles.head}
        >Edit Profile</Text>

        <View style={styles.formcont}>
          <Text style={styles.formlabel}>Name</Text>
          <TextInput style={styles.forminput}
            value={name}
            onChangeText={(text) => setName(text)}

          />
        </View>

        <View style={styles.formcont}>
          <Text style={styles.formlabel}>Phone</Text>
          <TextInput style={styles.forminput1}
            value={phone}
            // onChangeText={(text) => setPhone(text)}
            editable={false}
            selectTextOnFocus={false}
          />
        </View>

  
        <TouchableOpacity onPress={() => handleSave()}>
          <View style={styles.settingbtn}>
            <Text style={styles.settingbtntext}>Update</Text>
            <AntDesign name="edit" size={24} color="black"
              style={styles.settingbtnicon}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  head: {
    fontSize: 25,
    fontWeight: '400',
    textAlign: 'center',
    backgroundColor: col1,
    padding: 10,
    color: 'white',
    borderRadius: 10,
    margin: 10
  },
  formcont: {
    margin: 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: col1,
    padding: 0,
    borderRadius: 10,
    margin: 10
  },
  formlabel: {
    fontSize: 16,
    fontWeight: '400',
    width: '20%',
    color: col2
  },
  forminput: {
    width: '70%',
    color: col2,
    borderBottomColor: col1,
    borderBottomWidth: 1,
    padding: 0,
  },
  forminput1: {
    width: '70%',
    color: 'black',
    borderBottomColor: col1,
    borderBottomWidth: 1,
    padding: 0,
    backgroundColor: col1,
    borderRadius: 10,
    padding: 5,
  },
  settingbtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: col1,
    padding: 10,
    borderRadius: 20,
    width: '50%',
    alignSelf: 'center',
  },
  settingbtntext: {
    fontSize: 16,
    color: 'white',
    marginRight: 10,
  },
  settingbtnicon: {
    color: 'white',
  },

})