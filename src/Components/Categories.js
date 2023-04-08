import { StyleSheet, Text, View, ScrollView ,TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { colors } from '../globals/style'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { col1, col2 } from '../styles/colors';
import fruit from '../../src/assets/fruit.png';
import plant from '../../src/assets/plant.png';
import flower from '../../src/assets/flower.png';

const Categories = ({navigation}) => {
    return (
        <View style={styles.container}>
          
          <TouchableOpacity style={styles.box1}
                    onPress={() => navigation.navigate('Category', { category: 'fruit' })}
                >
                    <Image source={fruit} style={{ width:60,height:60,borderRadius:30 }} />
                    <Text style={styles.mytext}>Fruits</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box1}
                    onPress={() => navigation.navigate('Category', { category: 'plant' })}
                >
                    <Image source={plant} style={{width:60,height:60,borderRadius:30}} />
                    <Text style={styles.mytext}>Plants</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box1}
                    onPress={() => navigation.navigate('Category', { category: 'flower' })}
                >
                    <Image source={flower} style={{width:60,height:60,borderRadius:30}} />
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