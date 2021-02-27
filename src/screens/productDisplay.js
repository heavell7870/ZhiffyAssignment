import React,{useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, ActivityIndicator, Linking, FlatList, ScrollView } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";

function ProductDisplay({navigation}) {

   const id = navigation.getParam('id')

   const [data, setData] = useState([])
   const [loading, setLoading] = useState(true)
   const [imageData, setImageData] = useState([
    "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80",
    "https://source.unsplash.com/1024x768/?water",
    "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80",
    "https://source.unsplash.com/1024x768/?tree",          
  ])

   useEffect(()=>{

       fetch(`https://api.bestbuy.com/v1/products/${id}.json?apiKey=AbLMCxfXGS8vlNiAFQbYHUcM`)
       .then((response) => response.json())
       .catch((error) => console.error(error))
       .then((json) =>setData(json))
       .finally(()=>setLoading(false))

   }, []);

    if(loading){
        return <ActivityIndicator color = 'red'/>
    }

    return(
        <View style = {{height:'100%'}}>
        <ScrollView>
        <SliderBox
            images={imageData}
            sliderBoxHeight={180}
            onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
            />
          <View style = {{height:120, backgroundColor:"#E6ECF3", borderBottomColor:"#a0a0a0", borderBottomWidth:1}}>
              <Text style = {{fontSize:16, marginTop:10, marginLeft:10, color:'#606060'}}>{data.name}</Text>
              <View style = {{flexDirection:"row"}}>
                <Text style = {{fontWeight:"bold", fontSize:19, marginLeft:10, marginTop:5}}>$ {data.salePrice}</Text>
                <Text style = {{fontWeight:"100", fontSize:13, marginLeft:10, marginTop: 7, color:'#606060'}}>($ {data.regularPrice})</Text>
                <View style = {{height:18, width:65, backgroundColor:"#ffff99", justifyContent:"center", alignItems:"center", marginLeft:10, borderRadius:5, elevation:2, flexDirection:"row", marginTop:7}}>
                  <Text style = {{fontSize:12, color:"grey"}}>{data.percentSavings}% off </Text>
                </View>
              </View>
              <View style = {{flexDirection:"row", marginTop:10}}>
                    <View style = {{height:25, width:55, backgroundColor:"#0AAC05", justifyContent:"center", alignItems:"center", marginLeft:10, borderRadius:5, elevation:2, flexDirection:"row"}}>
                       <Text style = {{color:'white'}}>{data.customerReviewAverage}&#9733;</Text>
                    </View>
                    <Text style = {{color:'grey', fontSize:15, fontWeight:'100', marginLeft:5}}>{data.customerReviewCount} Ratings</Text>
              </View>
           </View>
           <View style = {{marginTop:10, borderBottomColor:'grey', borderBottomWidth:0.5, padding:10}}>
               <Text style = {{fontWeight:"bold", fontSize:15, marginLeft:5}}>Details</Text>
               <View style = {{marginTop:10, marginLeft:10}}>
                <Text>&#x25CF; Avilable in {data.color} Color</Text>
                <Text>&#x25CF; Warranty {data.warrantyLabor}</Text>
                <Text>&#x25CF; Total Discount ${data.dollarSavings}</Text>
                <Text>&#x25CF; Manufactured by {data.manufacturer}</Text>
               </View>
           </View>
           <View style = {{marginTop:10, borderBottomColor:'grey', borderBottomWidth:0.5, padding:10}}>
               <Text style = {{fontWeight:"bold", fontSize:15, marginLeft: 5}}>Description</Text>
               <View style = {{marginTop:10, marginLeft:10}}>
                 <Text>{data.longDescription}</Text>
               </View>
           </View>
           <View style = {{marginTop:10, borderBottomColor:'grey', borderBottomWidth:0.5, padding:10, marginBottom:10}}>
             <Text style = {{fontWeight:"bold", fontSize:15, marginLeft: 5}}>Items included</Text>
             <FlatList
                data = {data.includedItemList}
                keyExtractor={item => item.includedItem}
                renderItem = {({ item }) => (
                    <View style = {{height:50, justifyContent:"center"}}>
                        <Text>&#x25CF; {item.includedItem}</Text>
                    </View>
            )}
            />
           </View>
          </ScrollView>
          <View style = {{backgroundColor:"#ffffff", position:"absolute", bottom:0, height:60, width:"100%", flexDirection:"row"}}>
             <TouchableOpacity style = {{width:'50%'}} >
                 <View style = {{height:60, backgroundColor:"#ffffff", justifyContent:"center", alignItems:"center"}}>
                     <Text style = {{fontWeight:'900', fontSize:15, color:'#606060'}}>CONTACT SELLER</Text>
                 </View>
             </TouchableOpacity>
             <TouchableOpacity  style = {{width:'50%'}} onPress = {()=> Linking.openURL(data.url)}>
                 <View style = {{height:60, backgroundColor:"#009900", justifyContent:"center", alignItems:"center"}}>
                     <Text style = {{fontWeight:'900', fontSize:15, color:'white'}}>BUY NOW</Text>
                 </View>
             </TouchableOpacity>
          </View>
        </View>
    );
};

export default ProductDisplay;