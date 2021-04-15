import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Dimensions, Platform, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

import { IconButton } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';

import Navbar from '../components/Navbar';
import CustomButton from '../components/CustomButton';

import car from '../assets/images/car.png'
import walking from '../assets/images/walking.png'
import bicycle from '../assets/images/bicycle.png'

const WIDTH = Dimensions.get("window").height;

export function direction({ navigation }) {

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
        <View style={{backgroundColor: '#ffffff'}}>
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
                    accountPress={() => navigation.navigate('profil', {userInfos: user})}
                />
            </ScrollView>

            <MapView
                initialRegion={region}
                onRegionChangeComplete={(val) => setRegion({latitude: val.latitude, longitude: val.longitude, latitudeDelta: val.latitudeDelta, longitudeDelta: val.longitudeDelta})}
                style={{width: '100%', height: 450}}
            >
                { spot.value.map((info, index) => (
                <Marker
                    key={index}
                    coordinate={{ latitude : info.lat , longitude : info.lng }}
                    onPress={() => navigation.navigate('spot', {spotId: info.id, userInfos: user})}
                />
                ))}
            </MapView>

            <View style={{position: 'relative', top: 10, flexDirection: 'row', flex: 1, alignSelf: 'center', justifyContent: 'space-around',}}>
                <View>
                <TouchableOpacity>
                <Image source={car} style={styles.icons}/>
                </TouchableOpacity>
                </View>

                <View>
                <TouchableOpacity>
                <Image source={bicycle}  style={styles.icons}/>
                </TouchableOpacity>
                </View>

                <View>
                <TouchableOpacity>
                <Image source={walking}  style={styles.icons}/>
                </TouchableOpacity>
                </View>
            </View>

            <View style={{position: 'relative', top: 10, flexDirection: 'row', flex: 1, alignSelf: 'center', justifyContent: 'space-around',}}>
                <View>
                <Text style={styles.text}>Distance</Text>
                <Text style={styles.data}>18.2 km</Text>
                </View>

                <View>
                <Text style={styles.text}>Durée :</Text>
                <Text style={styles.data}>37 minutes</Text>
                </View>
            </View>

            <View style={{zIndex: 100, flex: 1, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around', width: '99%', top: 100, left: 100}}>
            <CustomButton
                key={1}
                actionsbtn={() => navigation.navigate('dashboard')}
                title={'Retour'}
                width={200}
         />
        </View>

            <StatusBar style="auto" hidden={true}/>
        </View>
    </View>
    ); 
}

const styles = StyleSheet.create({
    icons: {
        flex: 1, 
        alignSelf: 'center', 
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: 55,
        height: 55,
        borderRadius: 60,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    data: {
        fontSize: 8,
        fontWeight: 'bold',
        color: '#34568b',
    },
})