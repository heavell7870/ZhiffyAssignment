import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const MenuBar = () => {
    return(
        <TouchableOpacity>
            <View>
              <Text style = {{color:'#0080ff', fontSize:30,  fontWeight:"100"}}>&#9776;</Text>
            </View>
        </TouchableOpacity>
    );
};


export default MenuBar;