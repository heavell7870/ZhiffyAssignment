import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CategoriesView({navigation}){

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
       {checkData();}
    }, [])

    const checkData = async () => {
         
        try {
            const value = await AsyncStorage.getItem('productCat')
            if(value === null) {
              {requestData();}
            } else {
              setData(JSON.parse(value))
            }
          } catch(e) {
            console.log(e)
          }

    }

    console.log(data.name)

    const requestData = () => {
        fetch('https://api.bestbuy.com/v1/categories?apiKey=AbLMCxfXGS8vlNiAFQbYHUcM&format=json')
        .then((response) => response.json())
        .catch((error) => console.error(error))
        .then((json) =>storeData(json)) 
        .then(()=> checkData())
        .catch((error) => console.error(error))
        .finally(() => setLoading(false))
    }

    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('productCat', jsonValue)
        } catch (e) {
          console.log(e)
        }
      }

      

    return(
        <View style = {{ height:100, marginTop:10}}>
            <View>
                <Text style = {{color:'black', fontWeight:'900', marginLeft:25}}>Categories &#9660;</Text>
            </View>
            <FlatList
            horizontal
             data = {data.categories}
             showsHorizontalScrollIndicator = {false}
             renderItem = {({ item }) => (
                 <TouchableOpacity style = {{marginLeft:15}} onPress = {()=>navigation.navigate('SubCat', {data:item.subCategories})} >
                    <View style = {{height:70, width:80, flex:1, alignItems:"center", justifyContent:"center"}}>
                      <Image style = {{height:50, width:50}} source = {require('../images/icons8-image-100.png')}/>
                      <Text numberOfLines = { 1 } style = {{color:'black', fontSize:10, marginTop:-5, fontWeight:'100'}}>{item.name}</Text>
                    </View>
                 </TouchableOpacity> 
              )}
            />
        </View>
    )
}

export default CategoriesView;
