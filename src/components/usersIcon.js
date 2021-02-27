import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

const UsersIcon = () => {
    return (
        <TouchableOpacity>
           <View style = {{height:30, width:30,  backgroundColor:'#99ccff', borderRadius:15, alignItems:"center", justifyContent:"center"}}>
               <Image style = {{height:25, width:25}} source = {require('../images/user-shape.png')} />
            </View>
        </TouchableOpacity>
    )
}

export default UsersIcon;