import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Dimensions, Platform, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

import MapView from 'react-native-maps';
import PolylineDirection from '@react-native-maps/polyline-direction';

import Navbar from '../components/Navbar';
import CustomButton from '../components/CustomButton';

import car from '../assets/images/car.png'
import walking from '../assets/images/walking.png'
import bicycle from '../assets/images/bicycle.png'

const WIDTH = Dimensions.get("window").height;

export function direction({ route, navigation }) {

    const { spotInfos, userInfos } = route.params;

    const [region, setRegion] = useState({})
    const [origin, setOrigin] = useState({})

    if(region.latitude === undefined || origin.latitude === undefined) {
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

        setOrigin({
            latitude: crd.latitude,
            longitude: crd.longitude,
        })
    }
    
    function error(err) {
        console.warn(`ERREUR (${err.code}): ${err.message}`);
    }

    const GOOGLE_MAPS_APIKEY = 'AIzaSyBPB7WjyuSV2X_zabLgQeLe8oszvNtlNCQ';

    return (
        <View style={{backgroundColor: '#ffffff'}}>
        <View>
            <ScrollView>
                <Navbar 
                    key={1}
                    dashboard={true}
                    plus={false}
                    plusPress={() => navigation.navigate('addspot', {userInfos: userInfos})}
                    like={false}
                    likePress={() => navigation.navigate('like', {userInfos: userInfos})}
                    account={false}
                    accountPress={() => navigation.navigate('profil', {userInfos: userInfos})}
                />
            </ScrollView>

            <MapView
                initialRegion={region}
                style={{width: '100%', height: HEIGHT - 50}}
                showsUserLocation={true}
                followsUserLocation={true}
            >
                <PolylineDirection
                    origin={origin}
                    destination={{latitude: spotInfos.lat, longitude: spotInfos.lng}}
                    apiKey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={4}
                    strokeColor="#12bc00"
                />

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
                    actionsbtn={() => navigation.navigate('spot', { userInfos: userInfos, spotId: spotId})}
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