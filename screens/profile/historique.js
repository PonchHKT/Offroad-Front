import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {  View, ScrollView, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

import Navbar from '../../components/Navbar';
import Historique from '../../components/Historique';

export function getHistorique({ navigation }) {

    const [user, setUser] = useState({})
    const [historiques, setHistorique] = useState({})

    useEffect(() => {
      try {
        const value = AsyncStorage.getItem('token')
        .then((token) => { 
          const decryptToken = jwt_decode(token);

          fetch(`https://offroad-app.herokuapp.com/api/users/${decryptToken.id}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            })

            .then((response) => response.json())
            .then((responseData) => {

                setUser(responseData.data.user)

                fetch(`https://offroad-app.herokuapp.com/api/historique/${decryptToken.id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => response.json())
                .then((responseData) => {
                    setHistorique(responseData.data)
                })

                .catch((error) =>{
                    console.error(error);
                })

            })

          .catch((error) =>{
              console.error(error);
          }) 

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

            <View style={{marginTop: 20}}>
                <Navbar 
                    key={1}
                    dashboard={false}
                    mapPress={() => navigation.navigate('dashboard')}
                    plus={false}
                    plusPress={() => navigation.navigate('addspot')}
                    like={false}
                    likePress={() => navigation.navigate('')}
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

            <StatusBar style="auto" />
        </ScrollView>
    ); 
}
