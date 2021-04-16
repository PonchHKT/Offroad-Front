import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {View, StyleSheet, Text, ScrollView, TouchableOpacity, ImageBackground, Dimensions, Share } from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import MapView from 'react-native-maps';

import Separator from '../../components/Separator2'
import Separator2 from '../../components/Separator'
import Navbar from '../../components/Navbar';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

export function stats({ route, navigation }) {

    const { userInfos, historiqueInfos } = route.params;
    
    const [region, setRegion] = useState({})
    const [histo, setHisto] = useState({})

    if(histo.id == undefined) {
        fetch(`https://offroad-app.herokuapp.com/api/historique/unique/${historiqueInfos.id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            if(responseData.data.historique) {
                setHisto(responseData.data.historique)
                console.log(histo)
            }
        })

        .catch((error) =>{
            console.error(error);
        })
    }

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

    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              `Regarde, ce que j'ai fait comme spot !`,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
            } else {
            }
          } else if (result.action === Share.dismissedAction) {
          }
        } catch (error) {
          alert(error.message);
        }
    };
    
    return(

        <ImageBackground style={{backgroundColor: 'white', height: HEIGHT}}>
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

                <Text style={styles.dataText}>Vitesse moyenne : {histo.vMoyen}</Text>
                <Text style={styles.dataText}>Durée : {histo.time}</Text>
                <Text style={styles.dataText}>Longueur : [data] </Text>
                <Text style={styles.dataText}>Vitesse max : [data]</Text>
            </View>

            <Separator2/>
            <Separator/>
            <Separator2/>

            <View style={styles.icons}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => onShare()}>
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
        marginBottom: 10,
        zIndex: 10,
        top: 610, //* Bug non responsive ?
        justifyContent: 'center',
        position: 'absolute',
    },
    buttonContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        zIndex: 10,

    }
});