import { StyleSheet, Text, View, ScrollView ,TouchableOpacity} from 'react-native'
import React from 'react'
import { colors } from '../globals/style'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { col1, col2 } from '../styles/colors';

const Categories = ({navigation}) => {
    return (
        <View style={styles.container}>
          
                <TouchableOpacity style={styles.box1}
                    onPress={() => navigation.navigate('Category', { category: 'fruit' })}
                >
                    <MaterialCommunityIcons name="fruit-watermelon" size={24} color="black" style={styles.myicon} />
                    <Text style={styles.mytext}>Fruits</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box1}
                    onPress={() => navigation.navigate('Category', { category: 'plant' })}
                >
                    <MaterialCommunityIcons name="leaf" size={24} color="black" style={styles.myicon} />
                    <Text style={styles.mytext}>Plants</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box1}
                    onPress={() => navigation.navigate('Category', { category: 'flower' })}
                >
                    <MaterialIcons name="local-florist" size={24} color="black" style={styles.myicon} />
                    <Text style={styles.mytext}>Flowers</Text>
                </TouchableOpacity>
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '95%',
        // height: 100,
        // alignItems: 'center',
        // elevation: 10,
        borderRadius: 20,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    myicon: {
        marginRight: 10,
        color: col2,
    },
    mytext: {
        color: col2,
    },
    box1: {
        backgroundColor: 'white',
        // elevation: 20,
        margin: 10,
        // padding: 10,
        // borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '25%',
    }
})