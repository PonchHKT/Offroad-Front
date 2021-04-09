import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, ScrollView, Alert, Dimensions, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconButton } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';

import Navbar from '../components/Navbar';

const HEIGHT = Dimensions.get("window").height;

export function dashboard({ navigation }) {

    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        verify: false
    })
    const [spot, setSpot] = useState({ value: [] })

    if(region.verify === false) {
        navigator.geolocation.getCurrentPosition(success, error, options);
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
            verify: true
        })
    }
    
    function error(err) {
        console.warn(`ERREUR (${err.code}): ${err.message}`);
    }

    if (!AsyncStorage.getItem('token')) {
        navigation.navigate('login')
    }
    
    async function logout() {
        Alert.alert('You have been disconnected')
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
                    plusPress={() => navigation.navigate('')}
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
            <IconButton
                icon={"check"}
                size={30}
                color={'black'}
                onPress={() => navigation.navigate('startrando')}
            />
            <IconButton
                icon={"check"}
                size={30}
                color={'blue'}
                onPress={() => navigation.navigate('addreview')}
            />
            <IconButton
                icon={"check"}
                size={30}
                color={'pink'}
                onPress={() => navigation.navigate('signalspot')}
            />
                        <IconButton
                icon={"check"}
                size={30}
                color={'orange'}
                onPress={() => navigation.navigate('addspot')}
            />
                                    <IconButton
                icon={"check"}
                size={30}
                color={'red'}
                onPress={() => navigation.navigate('addspotnext')}
            />
            <MapView
                region={region}
                style={{width: '100%', height: HEIGHT}}
            >
            </MapView>

            <StatusBar style="auto" />
        </ScrollView>
    ); 
}
