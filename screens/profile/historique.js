import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {  View, ScrollView, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

import Navbar from '../../components/Navbar';
import Historique from '../../components/Historique';

export function getHistorique({ route, navigation }) {

    const { userInfos } = route.params;

    const [historiques, setHistorique] = useState({})

    useEffect(() => {
        try {
            fetch(`https://offroad-app.herokuapp.com/api/historique/${userInfos.id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                function sort(tab) {
                    let changed;
                    do{
                        changed = false;
                        for(let i=0; i < tab.length-1; i++) {
                            if(tab[i].id > tab[i+1].id) {
                                let tmp = tab[i];
                                tab[i] = tab[i+1];
                                tab[i+1] = tmp;
                                changed = true;
                            }
                        }
                    } while(changed);
                }
                sort(responseData.data.historique)
                setHistorique(responseData.data)
            })
            .catch((error) =>{
                console.error(error);
            })
        } catch(e) {
            console.log(e)
        }
    },[])

    if (!historiques) {
        return <Text>Chargement...</Text>
    }
   
    return (
        <ScrollView>

            <View>
                <Navbar 
                    key={1}
                    dashboard={false}
                    mapPress={() => navigation.navigate('dashboard')}
                    plus={false}
                    plusPress={() => navigation.navigate('addspot')}
                    like={false}
                    likePress={() => navigation.navigate('like', {userInfos: userInfos})}
                    account={true}
                />
            </View>

            { !historiques.historique ?
                <View></View>
            :
                historiques.historique.map((historique) => (
                    <Historique
                        key={historique.id}
                        id={historique.id}
                        date={historique.createdAt}
                        img={historique.content}
                        note={historique.note}
                    />
                ))
            }

            <StatusBar style="auto" hidden={true}/>
        </ScrollView>
    ); 
}
