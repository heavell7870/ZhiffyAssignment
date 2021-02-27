import React,{useState, useEffect} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';


function ProductsViewScreen({navigation}){

    const id = navigation.getParam('id');
    console.log(id)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{

        fetch(`https://api.bestbuy.com/v1/products(categoryPath.id=${id})?show=sku,name,salePrice,image,customerReviewAverage,regularPrice,shortDescription,customerReviewCount&format=json&apiKey=AbLMCxfXGS8vlNiAFQbYHUcM`)
        .then((response) => response.json())
        .catch((error) => console.error(error))
        .then((json) =>setData(json))
        .finally(()=>setLoading(false))

    }, [])


    const calculate = (item) => {
          
        const discount = (item.regularPrice - item.salePrice) / item.regularPrice * 100;
        const slice = discount.toFixed(0)

        return slice;
    }



   if(loading){
       return(
           <ActivityIndicator color = 'red'/>
       )
   }

    return(
        <View style = {{backgroundColor:"#E7ECF2", height:'100%', alignItems:"center"}}>
        {
            data.products.length === 0? <Text style = {{marginTop:10}}>No products to show</Text>
        : 
        <View>
         <FlatList
          data = {data.products}
          showsHorizontalScrollIndicator = {false}
          keyExtractor={item => item.sku.toString()}
          renderItem = {({ item }) => {
            return(
            <TouchableOpacity onPress = {()=> navigation.navigate('Product', {id:item.sku})}>
              <View style = {{width: '100%', height:190, borderBottomWidth:0.5, borderBottomColor:"#3399ff", borderRadius:0, backgroundColor:"#E7ECF2", paddingVertical:10}}>
                <View style = {{ flexDirection:"row",}}> 
                    <Image source = {{uri : 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80'}} style = {{height:110, width:110, marginLeft:5, marginTop:5, borderRadius:5}}/>
                    <View style = {{width:200}}>
                      <Text numberOfLines= {2} style = {{color:'black', fontSize:15, marginTop:5, fontWeight:'900', marginLeft:10}}>{item.name}</Text>
                      <View style = {{flexDirection:"row", marginTop:5}}>
                      <View style = {{height:18, width:45, backgroundColor:"#0AAC05", justifyContent:"center", alignItems:"center", marginLeft:10, borderRadius:5, elevation:2, flexDirection:"row"}}>
                        <Text style = {{color:'white'}}>{item.customerReviewAverage}&#9733;</Text>
                      </View>
                      <Text style = {{color:'grey', fontSize:13, fontWeight:'100', marginLeft:5}}>({item.customerReviewCount})</Text>
                      </View>
                      <View style = {{flexDirection:"row"}}>
                        <Text style = {{color:'black', fontSize:17, fontWeight:'bold', marginLeft:10, marginTop:5}}>$ {item.salePrice}</Text>
                        <Text style = {{color:'grey', fontSize:13, fontWeight:'100', marginLeft:10, marginTop:7}}>($ {item.regularPrice})</Text>
                      </View>
                      <View style = {{height:18, width:45, backgroundColor:"#ffff99", justifyContent:"center", alignItems:"center", marginLeft:10, borderRadius:5, elevation:2, flexDirection:"row"}}>
                        <Text style = {{fontSize:12, color:"grey"}}>{calculate(item)}% off </Text>
                      </View>
                    </View>
                </View>
                <View style = {{height:35, backgroundColor:"white", borderWidth:1, borderColor:"#cce5ff", margin:10, borderRadius:5, alignItems:"center", justifyContent:'center'}}>
                  <Text numberOfLines ={2} style = {{fontSize:11, marginLeft:5}}>{item.shortDescription}</Text>
                </View>
              </View>
              </TouchableOpacity> 
            )
              
          }}
        />
        </View>
        }
        </View>
    )
};

export default ProductsViewScreen;