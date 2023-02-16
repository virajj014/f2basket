import { StyleSheet, Text, View, Dimensions, Image, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { btn1 } from '../../styles/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AntDesign from 'react-native-vector-icons/AntDesign'
// let screenheight =Dimensions.get('window').height;
import { sidebarState } from '../../Providers/sidebarProvider';
import { useRecoilState } from 'recoil'
import { col1 } from '../../styles/colors'
import logo from '../../assets/logoFull.png'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native'
const Sidebar = ({ navigation }) => {
    const [sidebar, setsidebar] = useRecoilState(sidebarState);

    const handlelogout = () => {
        AsyncStorage.setItem('loggeduser', JSON.stringify(false))
        navigation.navigate('Login')
    }


    const [userdata, setUserdata] = useState(null);
    const getuserdata = async () => {
        const user = await AsyncStorage.getItem('loggeduser');
        if (user) {
            setUserdata(JSON.parse(user).user);
            // console.log(JSON.parse(user).user);
            // {"user":{"name":"Harshal Jain","password":"hj123456","phone":"7000896210","address":"B-2, Sahib Parisar, Yadav Colony, Jabalpur","pincode":"482002"}}
        }
        else {
            navigation.navigate('Login');
        }
    }

    useEffect(() => {
        getuserdata();
    }, [])


    const sendmessageonwhatsapp = () => {
        let msg = "Hello, I am"
        msg += userdata?.name
        msg += " and I want to contact you regarding your app."
        
        let url = 'whatsapp://send?text=' + msg + '&phone=91' + 7000896210;
        Linking.openURL(url).then((data) => {
            console.log('WhatsApp Opened');
        }).catch(() => {
            alert('Make sure WhatsApp installed on your device');
        });
    }
    return (
        <View style={styles.sidebar}>
            <AntDesign name="closecircle" size={30} color="white" onPress={() => setsidebar(false)}
                style={{ position: 'absolute', top: 20, right: 20 }}
            />
            <View style={styles.sidebarin}>

                <Image source={logo} style={styles.logo} />
                <Text style={styles.txt1}>{userdata?.name}</Text>
                <Text style={styles.txt2}>{userdata?.phone}</Text>
                <Text style={styles.txt3}>{userdata?.address}</Text>
            </View>

            <TouchableOpacity style={styles.c1}
                onPress={() => { navigation.navigate('trackorders') }}
            >
                <FontAwesome5 name="map-marked-alt" size={30} color="black" style={styles.icon1} onPress={() => { navigation.navigate('trackorders') }} />
                <Text style={styles.txtin}>My Orders</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.c1}
                onPress={() => { navigation.navigate('settings') }}
            >
                {/* settings */}
                <FontAwesome5 name="cog" size={30} color="black" style={styles.icon1} onPress={() => { navigation.navigate('Settings') }} />
                <Text style={styles.txtin}>Settings</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.c1}
                onPress={() => Linking.openURL('https://harshalportfolio.vercel.app/')}
            >
                {/* about */}
                <FontAwesome5 name="info-circle" size={30} color="black" style={styles.icon1} onPress={() => { navigation.navigate('About') }} />
                <Text style={styles.txtin}>About Us</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.c1}
                 onPress={
                    ()=> sendmessageonwhatsapp()
                 }
            >
                {/* contact */}
                <FontAwesome5 name="phone" size={30} color="black" style={styles.icon1} onPress={() => { navigation.navigate('Contact') }} />
                <Text style={styles.txtin}
               
                >Contact Us</Text>
            </TouchableOpacity>
            <Text style={btn1}
                onPress={() => handlelogout()}
            >
                Logout
            </Text>
        </View>
    )
}

export default Sidebar

const styles = StyleSheet.create({
    sidebar: {
        flex: 1,
        // backgroundColor: 'red',
        // justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        position: 'relative',
    },
    sidebarin: {
        marginTop: 100,
        width: '95%',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    txt1: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    txt2: {
        fontSize: 16,
        color: 'black',
    },
    txt3: {
        textAlign: 'center',
        fontSize: 16,
        color: col1,
        backgroundColor: 'black',
        width: '100%',
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    logo: {
        width: '90%',
        height: 150,
        resizeMode: 'contain',
    },
    c1: {
        flexDirection: 'row',
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    icon1: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 50,
        color: col1,
        fontSize: 20,
    },
    txtin: {
        fontSize: 17,
        color: 'white',
        marginLeft: 10,
        fontWeight: 'bold',
    }
})