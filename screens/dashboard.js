import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Dimensions, Platform } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

import { IconButton } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';

import Navbar from '../components/Navbar';

const HEIGHT = Dimensions.get("window").height;

export function dashboard({ navigation }) {

    const [region, setRegion] = useState({})
    const [spot, setSpot] = useState({ value: [] })
    const [user, setUser] = useState({})
    const [token, setToken] = useState({})

    useEffect(() => {
        try {
            const value = AsyncStorage.getItem('token')
            .then((token) => { 
                const decryptToken = jwt_decode(token);
                setUser(decryptToken)
                setToken(token)
  
                fetch(`https://offroad-app.herokuapp.com/api/spot/${decryptToken.level}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => response.json())
                .then((responseData) => {
                    if(responseData.data.spot) {
                        setSpot({ value: responseData.data.spot})
                    }
                })

                .catch((error) =>{
                    console.error(error);
                })
    
          })
        } catch(e) {
          console.log(e)
        }
    },[])

    if(region.latitude == undefined) {
        navigator.geolocation.getCurrentPosition(success, error, options);
        return ( <View></View> )
    }

    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    
    function success(pos) {
        let crd = pos.coords;
    
        setRegion({
            latitude: crd.latitude,
            longitude: crd.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
    }
    
    function error(err) {
        console.warn(`ERREUR (${err.code}): ${err.message}`);
    }

    return (
        <View>
            <ScrollView>
                <Navbar 
                    key={1}
                    dashboard={true}
                    plus={false}
                    plusPress={() => navigation.navigate('addspot', {userInfos: user})}
                    like={false}
                    likePress={() => navigation.navigate('like', {userInfos: user})}
                    account={false}
                    accountPress={() => navigation.navigate('profil', {userInfos: user, token: token})}
                />
            </ScrollView>

            <MapView
                initialRegion={region}
                onRegionChangeComplete={(val) => setRegion({latitude: val.latitude, longitude: val.longitude, latitudeDelta: val.latitudeDelta, longitudeDelta: val.longitudeDelta})}
                style={{width: '100%', height: HEIGHT}}
            >
                { spot.value.map((info, index) => (
                <Marker
                    key={index}
                    coordinate={{ latitude : info.lat , longitude : info.lng }}
                    onPress={() => navigation.navigate('spot', {spotId: info.id, userInfos: user})}
                />
                ))}
            </MapView>

            <StatusBar style="auto" hidden={true}/>
        </View>
    ); 
}