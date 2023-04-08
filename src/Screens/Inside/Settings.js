import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { navbtn, navbtnin, navbtnout } from '../../styles/style';
import { col1, col2 } from '../../styles/colors';

const Settings = ({ navigation }) => {
  const handleLogout = () => {
    AsyncStorage.removeItem('loggeduser')
      .then(() => {
        navigation.navigate('Login');
      })
  }
  return (
    <View
      style={styles.container}
    >
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={navbtnout}>
        <View style={navbtn}>
          <AntDesign name="back" size={24} color="black" style={navbtnin} />
        </View>
      </TouchableOpacity>
      <ScrollView style={styles.containerin}>
        <Text style={styles.head1}>Settings</Text>
        <View style={styles.head2out}>
          <MaterialIcons name="account-circle" size={24} color="black"
            style={styles.head2icon}
          />
          <Text style={styles.head2}>
            Account</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('editprofile')}>
          <View style={styles.settingitem}>
            <Text style={styles.settingitemtext}>Edit profile</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black"
              style={styles.settingitemicon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('addresspage')}>
          <View style={styles.settingitem}>
            <Text style={styles.settingitemtext}>Edit Address</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black"
              style={styles.settingitemicon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword1')}>
          <View style={styles.settingitem}>
            <Text style={styles.settingitemtext}>Change Password</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black"
              style={styles.settingitemicon}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.head2out}>
          <Feather name="more-horizontal" size={24} color="black"
            style={styles.head2icon}
          />
          <Text style={styles.head2}>
            More</Text>
        </View>

        <TouchableOpacity
          onPress={() => Linking.openURL('https://harshalportfolio.vercel.app/')}
        >
          <View style={styles.settingitem}>
            <Text style={styles.settingitemtext}>Terms & Conditions</Text>
            <Entypo name="list" size={24} color="black"
              style={styles.settingitemicon}
            />
          </View>

        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => Linking.openURL('https://harshalportfolio.vercel.app/')}
        >
          <View style={styles.settingitem}>
            <Text style={styles.settingitemtext}>Privacy Policy</Text>
            <MaterialIcons name="privacy-tip" size={24} color="black"
              style={styles.settingitemicon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleLogout()}>
          <View style={styles.settingbtn}>
            <Text style={styles.settingbtntext}>Logout</Text>
            <MaterialCommunityIcons name="logout-variant" size={24} color="black"
              style={styles.settingbtnicon}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomnav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  head1: {
    fontSize: 30,
    marginTop: 20,
    textAlign: 'center',
    color: col1,
  },
  containerin: {
    marginHorizontal: 20,
  }
  ,
  head2out: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10,
    marginTop: 30,
  },
  head2: {
    fontSize: 20,
    marginLeft: 10,
    // marginTop: 20,
    color: col1,
  },
  head2icon: {
    color: col1,
  },
  settingitem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  settingitemtext: {
    fontSize: 16,
    color: col2,

  },
  settingitemicon: {
    // marginRight: 10,
    color: col2,
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