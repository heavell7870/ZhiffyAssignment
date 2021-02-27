import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';


function SubCategoryScreen({navigation}) {

    const SubCategories = navigation.getParam('data')
  

    return(
        <View>
            <FlatList
            
            data = {SubCategories}
            renderItem = {({ item }) => {
                return(
                  <TouchableOpacity onPress = {()=>  navigation.navigate('ProdsView', {id:item.id})}>
                      <View style = {{height:50, justifyContent:"center", borderBottomWidth:0.2, borderBottomColor:'#CEE0FF'}}>
                          <Text style = {{marginLeft:15, fontSize:15}}>{item.name}</Text>
                      </View>
                  </TouchableOpacity>
                )
            }}
            />
        </View>

    )
}

export default SubCategoryScreen;