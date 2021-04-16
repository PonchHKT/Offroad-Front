import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import PolylineDirection from '@react-native-maps/polyline-direction';

import Navbar from '../components/Navbar';
import CustomButton from '../components/CustomButton';

import car from '../assets/images/car.png'
import walking from '../assets/images/walking.png'
import bicycle from '../assets/images/bicycle.png'

export function direction({ route, navigation }) {

    const GOOGLE_MAPS_APIKEY = 'AIzaSyBPB7WjyuSV2X_zabLgQeLe8oszvNtlNCQ';

    const { spotInfos, userInfos } = route.params;

    const [region, setRegion] = useState({})
    const [origin, setOrigin] = useState({})

    const [infos, setInfos] = useState({})
    const [mode, setMode] = useState('driving')

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

    const updateValue = async(val) => {
        let kilom = val.distance * 1000;
        let km = Math.floor(kilom / 1000);
        let m = kilom - km * 1000;

        function str_pad_left2(string,pad,length) {
            return (new Array(length+1).join(pad)+string).slice(-length);
        }

        let distance = str_pad_left2(km,'0',2)+'km '+str_pad_left2(m,'0',2);

        let time = val.duration * 60;
        let hours = Math.floor(time / 3600);
        time = time - hours * 3600;
        let minutes = Math.floor(time / 60);
        let seconds = time - minutes * 60;
        function str_pad_left(string,pad,length) {
            return (new Array(length+1).join(pad)+string).slice(-length);
        }

        let duration = str_pad_left(hours,'0',2)+'h '+str_pad_left(minutes,'0',2)+'m '+str_pad_left(seconds,'0',2);

        if(distance != infos.distance || duration != infos.time) {
            setInfos({ distance: distance, time: duration})
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            
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

            <MapView
                initialRegion={region}
                style={{width: '100%', height: '60%'}}
                showsUserLocation={true}
                followsUserLocation={true}
            >
                <PolylineDirection
                    origin={origin}
                    destination={{latitude: spotInfos.lat, longitude: spotInfos.lng}}
                    apiKey={GOOGLE_MAPS_APIKEY}
                    onReady={(val) => updateValue(val)}
                    strokeWidth={4}
                    mode={mode}
                    strokeColor="#12bc00"
                />
                
                <Marker
                    coordinate={{ latitude : spotInfos.lat , longitude : spotInfos.lng }}
                    title={spotInfos.level}
                    description={spotInfos.adress}
                />

            </MapView>

            <View style={{height: '30%', marginTop: 10,}}>
                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-around'}}>
                    <View>
                        <TouchableOpacity onPress={() => setMode('driving')}>
                            <Image source={car} style={styles.icons}/>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => setMode('bicycling')}>
                            <Image source={bicycle}  style={styles.icons}/>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => setMode('walking')}>
                            <Image source={walking}  style={styles.icons}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{flexDirection: 'row', flex: 1, alignSelf: 'center', justifyContent: 'space-between', width: '70%'}}>
                    <View>
                        <Text style={styles.text}>Distance :</Text>
                        <Text style={styles.data}>{infos.distance}m</Text>
                    </View>

                    <View>
                    <Text style={styles.text}>Durée :</Text>
                    <Text style={styles.data}>{infos.time}s</Text>
                    </View>
                </View>

                <View style={{marginBottom: 15}}>
                    <CustomButton
                        key={1}
                        actionsbtn={() => navigation.navigate('spot', { userInfos: userInfos, spotId: spotInfos.id})}
                        title={'Retour'}
                        width={200}
                    />
                </View>
            </View>

            <StatusBar style="auto" hidden={true}/>
        </View>
    ); 
}

const styles = StyleSheet.create({
    icons: {
        width: 55,
        height: 55,
        borderRadius: 60,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    data: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#34568b',
    },
})