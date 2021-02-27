import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


function PreusedItem({navigation}){

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{

        fetch('http://18.221.177.41:8080/api/getListings')
        .then((response) => response.json())
        .catch((error) => console.error(error))
        .then((json) =>setData(json))
        .finally(()=>setLoading(false))

    }, [])

    if(loading){
      return(
        <SkeletonPlaceholder backgroundColor = '#e0e0e0'>
        <View>
        <View style={{ flexDirection: "row"}}>
          <View style = {{height:110, width:110, marginLeft:10, marginTop:5, borderRadius:5}}/>
          <View>
            <View style = {{width:220, height:30, borderRadius:5, marginTop:5, marginLeft:10}}/>
            <View style = {{width:70, height:20, borderRadius:5, marginTop:5, marginLeft:10}}/>
            <View style = {{width:140, height:20, borderRadius:5, marginTop:5, marginLeft:10}}/>
            <View style = {{width:50, height:20, borderRadius:5, marginTop:5, marginLeft:10}}/>
          </View>
         </View>
         <View style = {{width:'90%', height:30, borderRadius:5, marginTop:5, marginHorizontal:'5%'}}/>
        </View>
      </SkeletonPlaceholder>
      )
    }

        return(
            <View style = {{marginTop:10, marginRight:10}}>
                <View>
                    <Text style = {{color:'black', fontWeight:'900', marginLeft:25, marginBottom:10, fontSize:16}}>Preused Products</Text>
                </View>
                <FlatList
                horizontal
                 data = {data.data}
                 showsHorizontalScrollIndicator = {false}
                 keyExtractor={item => item.listing_id}
                 renderItem = {({ item }) => {
                    return(
                    <TouchableOpacity style = {{marginLeft:8}} onPress = {()=> navigation.navigate('UsedProd', {id:item.listing_id})}>
                      <View style = {{width: 350, height:170, borderWidth:1, borderColor:"#3399ff", borderRadius:10, backgroundColor:"#E7ECF2"}}>
                        <View style = {{ flexDirection:"row",}}> 
                           <Image source = {{uri :`http://18.221.177.41:8080${item.path_dir}`}} style = {{height:110, width:110, marginLeft:5, marginTop:5, borderRadius:5}}/>
                           <View style = {{width:200}}>
                             <Text numberOfLines= {2} style = {{color:'black', fontSize:15, marginTop:5, fontWeight:'900', marginLeft:10}}>{item.item_name}</Text>
                             <View style = {{flexDirection:"row"}}>
                                <Text style = {{color:'black', fontSize:17, fontWeight:'bold', marginLeft:10, marginTop:5}}>&#8377;{item.price}</Text>
                                <Image source = {require('../images/pin.png')} style = {{height:14, width:14,marginTop:7, marginLeft:10}}/>
                                <Text style = {{color:'grey', fontSize:14, fontWeight:'100', marginLeft:2, marginTop:7}}>{item.city}</Text>
                              </View>
                            {
                              item.status === 'Active' ?
                               <View style = {{height:18, width:75, backgroundColor:"#0AAC05", justifyContent:"center", alignItems:"center", marginLeft:10, borderRadius:5, flexDirection:"row", marginTop:10}}>
                                <Text style = {{color:'white', fontSize:12}}>Avilable</Text>
                              </View> :
                              null
                            }
                           </View>
                        </View>
                        <View style = {{width:330, height:35, backgroundColor:"white", borderWidth:1, borderColor:"#cce5ff", margin:10, borderRadius:5, alignItems:"center", justifyContent:'center'}}>
                          <Text numberOfLines ={2} style = {{fontSize:11, marginLeft:5}}>{item.description}</Text>
                        </View>
                      </View>
                     </TouchableOpacity> 
                    )
                     
                 }}
                />
            
            </View>
                )
  }

         
      

export default PreusedItem;
