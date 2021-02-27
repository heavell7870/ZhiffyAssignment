import React, {useEffect, useState} from 'react';
import {Text, View, PermissionsAndroid, Image, TextInput, ActivityIndicator} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Location(){

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        {getData();}
    },[])

    const requestLocationPermission = async () => {
      console.log('hii')
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location",
              message:
                "Zhiffy needs access to your Loaction ",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              Geolocation.getCurrentPosition(
                (position) => {
                  fetch(`http://apis.mapmyindia.com/advancedmaps/v1/w8kjew2qcormafigq7bo92bawrgzflic/rev_geocode?lat=${position.coords.latitude}&lng=${position.coords.longitude}`)
                 .then((response) => response.json())
                 .catch((error) => console.error(error))
                 .then((json) =>storeData(json)) 
                 .then(()=> getData())
                 .catch((error) => console.error(error))
                },
                (error) => {
                  // See error code charts below.
                  console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
             );
          } else {
            console.log("Location permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      }

      const getData = async () => {

        try {
          const value = await AsyncStorage.getItem('userLocation')
          if(value === null) {
            {requestLocationPermission();}
          } else {
            setData(JSON.parse(value))
          }
        } catch(e) {
          console.log(e)
        }
      }

      const storeData = async (value) => {
        console.log('hii')
        try {
          const jsonValue = JSON.stringify(value)
          console.log(jsonValue, 'hii')
          await AsyncStorage.setItem('userLocation', jsonValue)
         } catch (e) {
          console.log(e)
        }
      }

     // console.log(data.results[0].formatted_address){data.results[0].street}, {data.results[0].subDistrict}

     if(data.results){
        return(
            <Text style = {{fontWeight:'500', marginLeft:5}}>
               {data.results[0].street}, {data.results[0].subDistrict}
            </Text>
        )
     } else {
         return(null)
     }
}

export default Location;