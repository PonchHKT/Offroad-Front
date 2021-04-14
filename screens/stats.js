import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, ScrollView, TouchableOpacity, ImageBackground} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Separator from '../components/Separator2'
import Separator2 from '../components/Separator'
import Navbar from '../components/Navbar';
import {FontAwesome} from '@expo/vector-icons';


export function stats({ route, navigation }) {

    const { userInfos } = route.params;
    
    const [region, setRegion] = useState({})

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
    
    return(

        <ImageBackground style={{backgroundColor: 'white',}}>
        <View>
            <View>

                <ScrollView>
                    <Navbar 
                        key={1}
                        id={1}
                        dashboard={false}
                        mapPress={() => navigation.navigate('dashboard')}
                        plus={false}
                        plusPress={() => navigation.navigate('addspot', {userInfos: userInfos})}
                        like={false}
                        likePress={() => navigation.navigate('like', {userInfos: userInfos})}
                        account={true}
                    />
                </ScrollView>

            <MapView
                region={region}
                style={{width: '100%', height: 300}}
            />

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
            
            <StatusBar style="auto" hidden={true}/>
            </View>
        </View>
        </ImageBackground>
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
    icons: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        bottom: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        paddingLeft: 20,
        paddingRight: 20
    }
});