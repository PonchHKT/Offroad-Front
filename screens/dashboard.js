import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Dimensions, Text } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

import { IconButton } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';

import Navbar from '../components/Navbar';

import markerPng from '../assets/images/marker.png';

const HEIGHT = Dimensions.get("window").height;

export function dashboard({ navigation }) {

    const [region, setRegion] = useState({})

    const [spot, setSpot] = useState({ value: [] })

    // useEffect(() => {
    //     try {
    //         const value = AsyncStorage.getItem('token')
    //         .then((token) => { 
    //             const decryptToken = jwt_decode(token);
  
    //             fetch(`https://offroad-app.herokuapp.com/api/spot/${decryptToken.level}`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //             })
    //             .then((response) => response.json())
    //             .then((responseData) => {
    //                 console.log(responseData)
    //             })

    //             .catch((error) =>{
    //                 console.error(error);
    //             })
    
    //       })
    //     } catch(e) {
    //       console.log(e)
    //     }
    // },[])

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

    if (!AsyncStorage.getItem('token')) {
        navigation.navigate('login')
    }
    
    async function logout() {
        Alert.alert('Vous avez été déconnecté !')
        try {
            await AsyncStorage.removeItem('token')
            navigation.navigate('login')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <ScrollView>
            <View>
                <Navbar 
                    key={1}
                    id={1}
                    dashboard={true}
                    plus={false}
                    plusPress={() => navigation.navigate('addspot')}
                    like={false}
                    likePress={() => navigation.navigate('')}
                    account={false}
                    accountPress={() => navigation.navigate('')}
                />
            </View>
            <IconButton
                icon={"plus-circle"}
                size={30}
                color={'black'}
                onPress={() => logout()}
            />
            <IconButton
                icon={"plus-circle"}
                size={30}
                color={'pink'}
                onPress={() => navigation.navigate('getHistorique')}
            />
            <IconButton
                icon={"folder"}
                size={30}
                color={'black'}
                onPress={() => navigation.navigate('spot')}
            />
            <IconButton
                icon={"eye"}
                size={30}
                color={'black'}
                onPress={() => navigation.navigate('comments')}
            />
              
            <MapView
                region={region}
                style={{width: '100%', height: HEIGHT}}
            >
                {/* { spot.value.map((info) => (
                <Marker
                    coordinate={{ latitude : info.latitude , longitude : info.longitude }}
                    image={markerPng}
                />
                ))} */}
            </MapView>

            <StatusBar style="auto" />
        </ScrollView>
    ); 
}