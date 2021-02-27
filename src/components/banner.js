import React, {useState} from 'react';
import {View} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";

function Banner() {
 
    const [data, setData] = useState([
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree",          
      ])

    return(
        <View>
            <SliderBox
            images={data}
            sliderBoxHeight={180}
            onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
            ImageComponentStyle={{borderRadius: 15, width: '97.5%', marginTop: 5}}
            />
        </View>
    )
}

export default Banner