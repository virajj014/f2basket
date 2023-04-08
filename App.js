import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './src/Screens/Auth/Welcome';
import Login from './src/Screens/Auth/Login';
import Signup1 from './src/Screens/Auth/Signup/Signup1';
import Signup2 from './src/Screens/Auth/Signup/Signup2';
import ForgotPassword1 from './src/Screens/Auth/ForgotPassword/ForgotPassword1';
import ForgotPassword2 from './src/Screens/Auth/ForgotPassword/ForgotPassword2';
import ForgotPassword3 from './src/Screens/Auth/ForgotPassword/ForgotPassword3';
import Home from './src/Screens/Inside/Home';
import Productpage from './src/Screens/Inside/Productpage';
import Sidebar from './src/Screens/Inside/Sidebar';

import { RecoilRoot } from 'recoil';
import UserCart from './src/Screens/Inside/UserCart';
import PlaceOrder from './src/Screens/PlaceOrder';
import TrackOrders from './src/Screens/Inside/TrackOrders';
import Category from './src/Screens/Inside/Category';
import Settings from './src/Screens/Inside/Settings';
import EditProfile from './src/Screens/Inside/EditProfile';


import { createDrawerNavigator } from '@react-navigation/drawer';
import Payments from './src/Components/Payments';
import AddressPage from './src/Screens/Inside/AddressPage';
import WholeSaleProductPage from './src/Screens/Inside/WholeSaleProductPage';
import OrderPlaced from './src/Components/OrderPlaced';

const App = () => {
  const Stack = createNativeStackNavigator();
  // drawer navigation
  // const Drawer = createDrawerNavigator();


  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Welcome" component={Welcome} 
          //  pass props to welcome screen
          initialParams={{callchecklogin:true}}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup1" component={Signup1} />
          <Stack.Screen name="Signup2" component={Signup2} />
          <Stack.Screen name="ForgotPassword1" component={ForgotPassword1} />
          <Stack.Screen name="ForgotPassword2" component={ForgotPassword2} />
          <Stack.Screen name="ForgotPassword3" component={ForgotPassword3} />
          <Stack.Screen name="addresspage" component={AddressPage}
           options={{
            headerShown: true,
            headerTitle: 'Address',
           }}
          />

          {/* Inside App */}
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="productpage" component={Productpage} />
          <Stack.Screen name="WholeSaleProductPage" component={WholeSaleProductPage} />
          <Stack.Screen name="cart" component={UserCart} />
          <Stack.Screen name="placeorder" component={PlaceOrder} />
          <Stack.Screen name="trackorders" component={TrackOrders} />
          <Stack.Screen name="Category" component={Category} />
          <Stack.Screen name="settings" component={Settings} />
          <Stack.Screen name="editprofile" component={EditProfile} />
          {/* payments */}
          <Stack.Screen name="Payments" component={Payments} />
          <Stack.Screen name="OrderPlaced" component={OrderPlaced} />
        </Stack.Navigator>
      </NavigationContainer>
      </RecoilRoot>
  )
}

export default App

const styles = StyleSheet.create({})