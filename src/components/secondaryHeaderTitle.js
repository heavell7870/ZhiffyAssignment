import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Location from './location';



const SecondaryHeaderTitle = () => {


    return(
        <View>
           <Image style = {{height:53, width:150}} source = {require('../images/zhiffyLogo.jpeg')}/>
        </View>
    );
};

export default SecondaryHeaderTitle;