import React from 'react'
import {Image} from 'react-native'
import { createAppContainer, createSwitchNavigator  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HeaderTitle from './src/components/headerTitle';
import MenuBar from './src/components/menuBar';
import SecondaryHeaderTitle from './src/components/secondaryHeaderTitle';
import UsersIcon from './src/components/usersIcon';
import HomeScreen from './src/screens/HomeScreen';
import ProductDisplay from './src/screens/productDisplay';
import ProductsViewScreen from './src/screens/productsViewScreen';
import SubCategoryScreen from './src/screens/subCategoryScreen';
import UsedProductScreen from './src/screens/usedProductScreen';

const App = createSwitchNavigator({
  mainFlow : createStackNavigator({
    Home : {
      screen : HomeScreen,
      navigationOptions:{
        headerTitle: () =>  <HeaderTitle/>,
        headerLeft : () => <MenuBar/>,
        headerRight : () => <UsersIcon/>,
        headerStyle: { backgroundColor: '#f6f6f6',borderBottomColor: 'transparent',
        borderBottomWidth: 0, height:80 },headerTitleStyle: { color: 'white', marginLeft:80},
        headerRightContainerStyle: {marginRight:10},
        headerLeftContainerStyle: {marginLeft:12}
     }
    },
    SubCat : {
      screen : SubCategoryScreen,
      navigationOptions:{
        headerTitle: () =>  <SecondaryHeaderTitle/>,
        headerRight : () => <UsersIcon/>,
        headerStyle: { backgroundColor: '#f6f6f6',borderBottomColor: 'transparent',
        borderBottomWidth: 0, height:80 },headerTitleStyle: { color: 'white', marginLeft:80},
        headerRightContainerStyle: {marginRight:10}
     }
    },
    UsedProd : {
      screen : UsedProductScreen,
      navigationOptions:{
        headerTitle: () =>  <SecondaryHeaderTitle/>,
        headerRight : () => <UsersIcon/>,
        headerStyle: { backgroundColor: '#f6f6f6',borderBottomColor: 'transparent',
        borderBottomWidth: 0, height:80 },headerTitleStyle: { color: 'white', marginLeft:80},
        headerRightContainerStyle: {marginRight:10}
     }
    },
    ProdsView : {
      screen : ProductsViewScreen,
      navigationOptions:{
        headerTitle: () =>  <SecondaryHeaderTitle/>,
        headerRight : () => <UsersIcon/>,
        headerStyle: { backgroundColor: '#f6f6f6',borderBottomColor: 'transparent',
        borderBottomWidth: 0, height:80 },headerTitleStyle: { color: 'white', marginLeft:80},
        headerRightContainerStyle: {marginRight:10}
     }
    },
    Product : {
      screen : ProductDisplay ,
      navigationOptions:{
        headerTitle: () =>  <SecondaryHeaderTitle/>,
        headerRight : () => <UsersIcon/>,
        headerStyle: { backgroundColor: '#f6f6f6',borderBottomColor: 'transparent',
        borderBottomWidth: 0, height:80 },headerTitleStyle: { color: 'white', marginLeft:80},
        headerRightContainerStyle: {marginRight:10}
     }
    },
  })
    
   

});

export default createAppContainer(App);