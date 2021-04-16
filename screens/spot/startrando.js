import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

import { getPreciseDistance, getSpeed } from 'geolib';


import CustomButton from '../../components/CustomButton';

const HEIGHT = Dimensions.get("window").height;

export function startrando({ route, navigation }) {

    const { spotInfos, userInfos } = route.params;

    const [region, setRegion] = useState({
        latitude: spotInfos.lat,
        longitude: spotInfos.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    
    const [coord, setCoord] = useState({})
    const [stopBoucle, setStop] = useState(false)
    const [polyline, setPolyline] = useState([{ latitude: region.latitude, longitude: region.longitude }])

    let longueur = 0;
    let secondes = 0;
    let speed = 0;
    let startDate = new Date();

    if(coord.latitude == undefined) {
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

    // console.log(stopBoucle)
    
    const Boucle = async() => {
        console.log(stopBoucle)

        try {
            console.log(stopBoucle)

            if(stopBoucle === false) {
                console.log(stopBoucle)

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

                    const newCoord = {latitude: position.coords.latitude, longitude: position.coords.longitude}
                    polyline.push(newCoord)
                    console.log('AH')
                    

                    secondes = secondes + (endDate.getTime() - startDate.getTime()) / 1000;
                    longueur = longueur + distance;

                    startDate = endDate
                    console.log(stopBoucle)
                    setTimeout(Boucle, 3000)
                })
                .catch((err) => {
                    console.error(err.message);
                })
            }
        } catch(e) {
            console.error(e.message)
        }
    }

    const Stop = async() => {
        setStop(true)
        // console.log(stopBoucle)

        // fetch(`https://offroad-app.herokuapp.com/api/historique/add`, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         distance: longueur,
        //         temps: secondes,
        //         speed: speed,
        //         spotId: spotInfos.id,
        //         authorId: userInfos.id
        //     })
        // })
        // .then((response) => response.json())
        // .then(async(responseData) => {
        //     console.log(responseData)
        //     navigation.navigate('dashboard')
        // })
        // .catch((error) =>{
        //     console.error(error);
        // })
    }

    return (
        <View style={styles.backgroundContainer}>
            <MapView
                region={region}
                showsUserLocation={true}
                followsUserLocation={true}
                scrollEnabled={false}
                style={styles.map}
            > 
                <Polyline  
                    coordinates={[{ latitude: region.latitude, longitude: region.longitude }, { latitude: 48.024838, longitude: -1.13891 }]}
                    strokeColor="#000"
                    fillColor="rgba(255,0,0,0.5)"
                    strokeWidth={2}
                />
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

            <View style={{marginBottom: 10}}>
                <CustomButton
                    key={3}
                    title={'Départ'}
                    style={styles.button}
                    actionsbtn={() => Boucle()}
                /></View>
            <StatusBar style="auto" hidden={true}/>
        </View>
)}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    map: {
        width: '100%',
        height: HEIGHT - 150,
        marginBottom: -50,
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 50,
    },
});