import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Location from './location';



const HeaderTitle = () => {


    return(
        <View>
           <Image style = {{height:53, width:150}} source = {require('../images/zhiffyLogo.jpeg')}/>
           <TouchableOpacity style = {{marginLeft:10, marginTop:-3}}>
               <View style = {{flexDirection:"row"}}>
                   <Image source = {require('../images/pin.png')} style = {{height:14, width:14,marginTop:3}}/>
                   <Location/>
               </View>
           </TouchableOpacity>
        </View>
    );
};

export default HeaderTitle;