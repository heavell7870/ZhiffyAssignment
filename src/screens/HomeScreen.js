import React, {useEffect, useState} from 'react';
import {Text, View, PermissionsAndroid, Image, TextInput, ActivityIndicator, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Banner from '../components/banner';
import CategoriesView from '../components/categoriesView';
import ProdRecommendation from '../components/prodRecommend';
import TrendingProduct from '../components/trendingProduct'
import PreusedItem from '../components/preUsedItem';



function HomeScreen({navigation}){

    


     // console.log(data.results[0].formatted_address){data.results[0].street}, {data.results[0].subDistrict}

    return(
          <ScrollView style = {{height:'100%'}}>
           <View>
              <View style = {{flexDirection:"row"}}>
                <View style ={{backgroundColor:"#E6ECF3", height:50, width:'85%', marginTop:10, borderWidth:1, borderColor:"#006666", marginLeft:5, borderRadius:5, alignItems:"center",  flexDirection:"row"}}>
                    <Text style = {{color:'black', fontSize:40, marginLeft:10, marginBottom:7}}>&#8981;</Text>
                    <Text style = {{color:'grey'}}>  What are you looking for ?</Text>
                </View>
                <Image style = {{height: 25, width: 25, marginTop:18, marginLeft:10}} source = {require('../images/icons8-bell-80.png')} />
              </View>
            <Banner/>
            <CategoriesView navigation = {navigation}/>
            <View style ={{backgroundColor:"#E6ECF3"}} >
            <View>
              <ProdRecommendation navigation = {navigation}/>
            </View>
            <View style = {{marginTop:40, marginBottom: 20}}>
              <TrendingProduct navigation = {navigation} />
            </View>
            <View style = {{marginTop:40, marginBottom: 20}}>
              <PreusedItem navigation = {navigation} />
            </View>
            </View>
          </View>
         </ScrollView>
    )
}

export default HomeScreen;