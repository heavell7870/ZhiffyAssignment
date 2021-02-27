import React,{useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, ActivityIndicator, Linking } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";

function UsedProductScreen({navigation}) {

   const id = navigation.getParam('id')

   const [data, setData] = useState([])
   const [loading, setLoading] = useState(true)

   useEffect(()=>{

       fetch(`http://18.221.177.41:8080/api/getListings/${id}`)
       .then((response) => response.json())
       .catch((error) => console.error(error))
       .then((json) =>setData(json))
       .finally(()=>setLoading(false))

   }, []);
 console.log(data.data)

    if(loading){
        return <ActivityIndicator color = 'red'/>
    }

    return(
        <View style = {{height:'100%'}}>
          <Image source = {{uri:`http://18.221.177.41:8080${data.data.path_dir}`}} style = {{width: '100%', height:200}}/>
          <View style = {{height:80, backgroundColor:"#E6ECF3", borderBottomColor:"#a0a0a0", borderBottomWidth:1}}>
              <Text style = {{fontSize:16, marginTop:10, marginLeft:10, color:'#606060'}}>{data.data.item_name}</Text>
              <Text style = {{fontWeight:"bold", fontSize:17, marginLeft:10, marginTop:5}}>&#8377; {data.data.price}</Text>
              <View style = {{flexDirection:"row", marginLeft:10}}>
                    <Image source = {require('../images/pin.png')} style = {{height:12, width:12,marginTop:3}}/>
                    <Text style = {{marginLeft:3, color:'#606060', fontSize:13}}>{data.data.city}</Text>
              </View>
          </View>
          <View style = {{borderBottomWidth:0.5, borderBottomColor:"#a0a0a0"}}>
              <Text style = {{fontWeight:"bold", margin:10}}>Description</Text>
              <View style = {{width:'95%', marginHorizontal:'2.5%', marginBottom:5}}>
                <Text style = {{color:'#404040'}}>{data.data.description}</Text>
              </View>
          </View>
          <View style = {{borderBottomWidth:0.5, borderBottomColor:"#a0a0a0", height:105}}>
              <Text style = {{fontWeight:"bold", margin:10}}>Seller</Text>
              <View style = {{flexDirection:"row", marginLeft:10}}>
                  <View style = {{height:60, width:60, backgroundColor:"#66B2FF", borderRadius:30, alignItems:"center", justifyContent:"center"}}>
                      <Image source = {require('../images/user-shape.png')} style = {{height: 50, width:50}}/>
                  </View>
                  <View style = {{marginLeft:15}}>
                  <Text style = {{fontSize:16, fontWeight:"bold"}}>{data.data.username}</Text>
                  <View style = {{flexDirection:"row"}}>
                    <Image source = {require('../images/pin.png')} style = {{height:14, width:14,marginTop:3}}/>
                    <Text style = {{marginLeft:5}}>{data.data.city}</Text>
                    <Text style = {{fontSize:13, marginLeft:5, color:'grey'}}>( {data.data.pincode} )</Text>
                  </View>
                  </View>
              </View>
          </View>
          <View style = {{backgroundColor:"#ffffff", position:"absolute", bottom:0, height:60, width:"100%", flexDirection:"row"}}>
             <TouchableOpacity style = {{width:'50%'}} >
                 <View style = {{height:60, backgroundColor:"#ffffff", justifyContent:"center", alignItems:"center"}}>
                     <Text style = {{fontWeight:'bold', fontSize:15, color:'#606060'}}>CONTACT SELLER</Text>
                 </View>
             </TouchableOpacity>
             <TouchableOpacity  style = {{width:'50%'}} onPress = {()=> Linking.openURL(data.data.url)}>
                 <View style = {{height:60, backgroundColor:"#009900", justifyContent:"center", alignItems:"center"}}>
                     <Text style = {{fontWeight:'bold', fontSize:15, color:'white'}}>BUY NOW</Text>
                 </View>
             </TouchableOpacity>
          </View>
        </View>
    );
};

export default UsedProductScreen;