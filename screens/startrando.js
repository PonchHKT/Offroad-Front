import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, CheckBox, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


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

return (
    <ImageBackground style={styles.backgroundContainer}>
    
    <MapView
    region={region}
    style={styles.map}>
    </MapView>
    
    <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.buttonOff}>
    <Text style={styles.buttonText}>DÉSACTIVER {"\n"}    ALARME </Text>
    </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.buttonStop}>
    <Text style={styles.buttonText}>ARRÊTER</Text>
    </TouchableOpacity>
        </View>


    </ImageBackground>
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
        height: HEIGHT,
        borderWidth: 4,
        borderColor: 'black',
        paddingBottom: 50,

    },
    buttonContainer: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignSelf: 'center',
        width: WIDTH - 50,

    },
    buttonOff: {
        justifyContent: 'center',
        width: WIDTH - 200,
        height: 55,
        backgroundColor: "black",
        borderWidth: 1.75,
        borderColor: "gray",
        borderRadius: 80,
        marginTop: 5,
        zIndex: 500,
        right: 10,
    },
    buttonStop: {
        justifyContent: 'center',
        width: WIDTH - 200,
        height: 55,
        backgroundColor: "black",
        borderWidth: 1.75,
        borderColor: "gray",
        borderRadius: 80,
        marginTop: 15,
        zIndex: 500,
        bottom: 71,
        left: 162,
    },
    buttonText: {
        alignSelf: 'center',
        color: 'white',    
    },
});