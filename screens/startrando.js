import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

import CustomButton from '../components/CustomButton';


const { width: WIDTH } = Dimensions.get('window')
const HEIGHT = Dimensions.get("window").height;

export function startrando({ navigation }) {

    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        verify: false
    })

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
                />
            </View>
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
        justifyContent: 'space-around'
    },

});