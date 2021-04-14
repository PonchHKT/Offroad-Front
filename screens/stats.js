import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import markerPng from '../assets/images/marker.png';
import Separator from '../components/Separator2'
import Separator2 from '../components/Separator'
import Navbar from '../components/Navbar';
import {FontAwesome} from '@expo/vector-icons';

const { width: WIDTH } = Dimensions.get('window')

export function stats({ route, navigation }) {

    const { userInfos } = route.params;
    
    const [region, setRegion] = useState({})
    const [spot, setSpot] = useState({ value: [] })

    useEffect(() => {
        try {
            const value = AsyncStorage.getItem('token')
            .then((token) => { 
                const decryptToken = jwt_decode(token);
  
                fetch(`https://offroad-app.herokuapp.com/api/spot/${decryptToken.level}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => response.json())
                .then((responseData) => {
                    setSpot({ value: responseData.data.spot})
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

    if (!AsyncStorage.getItem('token')) {
        navigation.navigate('welcome')
    }
    
    return(
        <View>
            <ScrollView>

                <View>
                <Navbar 
                    key={1}
                    id={1}
                    dashboard={false}
                    mapPress={() => navigation.navigate('dashboard')}
                    plus={false}
                    plusPress={() => navigation.navigate('addspot')}
                    like={false}
                    likePress={() => navigation.navigate('like', {userInfos: userInfos})}
                    account={true}
            /></View>

            <MapView
                region={region}
                style={{width: '100%', height: 300}} >
                { spot.value.map((info, index) => (
                <Marker
                    key={index}
                    coordinate={{ latitude : info.lat , longitude : info.lng }}
                    image={markerPng}
                    title={info.adress}
                    description={info.infos}
                />
                ))}</MapView>

            <View style={styles.dataContainer}>

                <Text style={styles.dataText}>Vitesse moyenne : [data]</Text>
                <Text style={styles.dataText}>Durée : [data]</Text>
                <Text style={styles.dataText}>Longueur : [data] </Text>
                <Text style={styles.dataText}>Vitesse max : [data]</Text>
            </View>

            <Separator2/>
            <Separator/>
            <Separator2/>

            <View style={styles.icons}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity>
                    <FontAwesome 
                        name="share" 
                        color="black"
                        size={38}
                        style={styles.locationBtn}/>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity>
                    <FontAwesome 
                        name="trash" 
                        color="black"
                        size={38}
                        style={styles.heartBtn}/>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity>
                    <FontAwesome 
                        name="download" 
                        color="black"
                        size={38}
                        style={styles.heartBtn}/>
                </TouchableOpacity>
            </View>
        </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    dataContainer: {
        marginTop: 10,
        justifyContent: 'space-between',
        marginLeft: 20,
    },
    dataText: {
        paddingTop: 20,
        fontWeight: 'bold',
        fontSize: 20,
    },
    buttonContainer: {
        paddingBottom: 10,
    },
    icons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: WIDTH - 230,
        marginBottom: 25,
        bottom: 8,
    },
});