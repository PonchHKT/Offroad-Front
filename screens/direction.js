import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';

import MapView from 'react-native-maps';
import PolylineDirection from '@react-native-maps/polyline-direction';

import Navbar from '../components/Navbar';
import CustomButton from '../components/CustomButton';

const HEIGHT = Dimensions.get("window").height;

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
            >
                <PolylineDirection
                    origin={origin}
                    destination={{latitude: spotInfos.lat, longitude: spotInfos.lng}}
                    apiKey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={4}
                    strokeColor="#12bc00"
                />

            </MapView>

            <View style={{zIndex: 100, flex: 1, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around', width: '99%', paddingTop: 10, paddingBottom: 20, bottom: 75, left: 100}}>

                <CustomButton
                    key={1}
                    actionsbtn={() => navigation.navigate('spot', { userInfos: userInfos, spotId: spotId})}
                    title={'Retour'}
                    width={200}
                />

            </View>

            <StatusBar style="auto" hidden={true}/>
        </View>
    ); 
}