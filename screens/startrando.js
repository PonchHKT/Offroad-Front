import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

import { getPreciseDistance, getSpeed } from 'geolib';


import CustomButton from '../components/CustomButton';

const HEIGHT = Dimensions.get("window").height;

export function startrando({ route, navigation }) {

    const { spotId } = route.params;

    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        verify: false
    })

    const [coord, setCoord] = useState({})

    let longueur = 0;
    let secondes = 0;
    let speed = 0;
    let startDate = new Date();

    const [userToken, setUserToken] = useState([])

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

        setCoord({
            latitude: crd.latitude,
            longitude: crd.longitude
        })
    }

    function error(err) {
        console.warn(`ERREUR (${err.code}): ${err.message}`);
    }

    const getPosition = function (options) {
        return new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
    }

    const Boucle = async() => {

        if (!startDate) {
            startDate = new Date();
        }

        getPosition()
        .then((position) => {
            
            let endDate = new Date();
            
            const distance = getPreciseDistance(
                { latitude: coord.latitude, longitude: coord.longitude },
                { latitude: position.coords.latitude, longitude: position.coords.longitude }
            )

            const speed2 = getSpeed(
                { latitude: coord.latitude, longitude: coord.longitude, time: startDate },
                { latitude: position.coords.latitude, longitude: position.coords.longitude, time: endDate }
            )

            if(speed2 > speed) {
                speed = speed2;
            }
            

            navigator.geolocation.getCurrentPosition(success, error)
            secondes = secondes + (endDate.getTime() - startDate.getTime()) / 1000;
            longueur = longueur + distance;

            startDate = endDate

            setTimeout(Boucle, 1000)
        })
        .catch((err) => {
            console.error(err.message);
        })
    }

    useEffect(() => {
        try {
            const value = AsyncStorage.getItem('token')
            .then((token) => { 
                const decryptToken = jwt_decode(token);
                setUserToken(decryptToken)
            })
        } catch(e) {
            console.log(e)
        }
    },[])

   

    const Stop = async() => {
        fetch(`https://offroad-app.herokuapp.com/api/historique/add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                distance: longueur,
                temps: secondes,
                speed: speed,
                spotId: spotId,
                authorId: userToken.id
            })
        })
        .then((response) => response.json())
        .then(async(responseData) => {
            // navigation.navigate('dashboard')
        })
        .catch((error) =>{
            console.error(error);
        })
    }

    return (
    
        <View style={styles.backgroundContainer}>
            <MapView
                region={region}
                style={styles.map}>
            </MapView>

            <View style={styles.buttons}>
                <CustomButton
                    key={1}
                    title={'Désactiver l\'alarme'}
                    style={styles.button}
                />

                <CustomButton
                    key={2}
                    title={'Arrêter'}
                    style={styles.button}
                    actionsbtn={() => Stop()}
                />
            </View>

                <CustomButton
                    key={3}
                    title={'Départ'}
                    style={styles.button}
                    actionsbtn={() => Boucle()}
                />
            <StatusBar style="auto" hidden={true}/>
        </View>
)}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: HEIGHT - 100,
        borderColor: 'black',
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-around',
        width: '100%'
    },
});