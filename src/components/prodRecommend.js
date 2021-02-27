import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator} from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


function ProdRecommendation({navigation}){

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
      fetch('https://api.bestbuy.com/beta/products/trendingViewed(categoryId=abcat0400000)?apiKey=AbLMCxfXGS8vlNiAFQbYHUcM')
      .then((response) => response.json())
      .catch((error) => console.error(error))
      .then((json) => setData(json))
      .finally(() => setLoading(false))
    }, []);

       const calculate = (item) => {
          
          const discount = (item.regular - item.current) / item.regular * 100;
          const slice = discount.toFixed(0)

          return slice;
      }


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
    <View style = {{marginTop:10}}>
        <View>
            <Text style = {{color:'black', fontWeight:'900', marginLeft:25, marginBottom:10, fontSize:16}}>Trending</Text>
        </View>
        <FlatList
        horizontal
          data = {data.results}
          showsHorizontalScrollIndicator = {false}
          keyExtractor={item => item.images.standard}
          renderItem = {({ item }) => {

            console.log(item.sku)

            return(
            <TouchableOpacity style = {{marginLeft:8}}  onPress = {()=> navigation.navigate('Product', {id:item.sku})}>
              <View style = {{width: 350, height:170, borderWidth:1, borderColor:"#3399ff", borderRadius:10, backgroundColor:"#E7ECF2"}}>
                <View style = {{ flexDirection:"row",}}> 
                    <Image source = {{uri :'https://source.unsplash.com/random'}} style = {{height:110, width:110, marginLeft:5, marginTop:5, borderRadius:5}}/>
                    <View style = {{width:200}}>
                      <Text numberOfLines= {2} style = {{color:'black', fontSize:15, marginTop:5, fontWeight:'900', marginLeft:10}}>{item.names.title}</Text>
                      <View style = {{flexDirection:"row", marginTop:5}}>
                      <View style = {{height:18, width:45, backgroundColor:"#0AAC05", justifyContent:"center", alignItems:"center", marginLeft:10, borderRadius:5, flexDirection:"row"}}>
                        <Text style = {{color:'white'}}>{item.customerReviews.averageScore}&#9733;</Text>
                      </View>
                      <Text style = {{color:'grey', fontSize:13, fontWeight:'100', marginLeft:5}}>({item.customerReviews.count})</Text>
                      </View>
                      <View style = {{flexDirection:"row"}}>
                        <Text style = {{color:'black', fontSize:17, fontWeight:'bold', marginLeft:10, marginTop:5}}>$ {item.prices.current}</Text>
                        <Text style = {{color:'grey', fontSize:13, fontWeight:'100', marginLeft:10, marginTop:7}}>($ {item.prices.regular})</Text>
                      </View>
                      <View style = {{height:18, width:45, backgroundColor:"#ffff99", justifyContent:"center", alignItems:"center", marginLeft:10, borderRadius:5, flexDirection:"row"}}>
                        <Text style = {{fontSize:12, color:"grey"}}>{calculate(item.prices)}% off </Text>
                      </View>
                    </View>
                </View>
                <View style = {{width:330, height:35, backgroundColor:"white", borderWidth:1, borderColor:"#cce5ff", margin:10, borderRadius:5, alignItems:"center", justifyContent:'center'}}>
                  <Text numberOfLines ={2} style = {{fontSize:11, marginLeft:5}}>{item.descriptions.short}</Text>
                </View>
              </View>
              </TouchableOpacity> 
            )
              
          }}
        />
    </View>
  );
    
   }

         
      

export default ProdRecommendation;
