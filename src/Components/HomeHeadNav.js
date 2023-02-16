import { StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native'
import React from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { col1 } from '../styles/colors';
import { sidebarState } from '../Providers/sidebarProvider';
import { useRecoilState } from 'recoil'
// import { colors } from '../globals/style';
import logo from '../assets/logo1.png'

const HomeHeadNav = ({ navigation }) => {
    const [sidebar, setsidebar] = useRecoilState(sidebarState);

    return (
        <View style={styles.container}>

            <Fontisto name="nav-icon-list-a" size={20} color="black" style={styles.myicon}
                onPress={() => { setsidebar(true) }}
            />
            <View style={styles.containerin}>
                {/* <Text style={styles.mytext}>F2B</Text> */}
                <Image source={logo} style={styles.logo} />
                {/* <MaterialCommunityIcons name="food-outline" size={26} color="black" style={styles.myicon} /> */}
            </View>
            
        </View>
    )
}

export default HomeHeadNav

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        // padding: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        elevation: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    containerin: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    myicon: {
        color: col1,
    },
    mytext: {
        color: col1,
        fontSize: 24,
    },
    logo:{
        width: 100,
        height: 50,
        resizeMode: 'contain',
    }
})