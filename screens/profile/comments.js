import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {  View, ScrollView, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

import Navbar from '../../components/Navbar';
import Historique from '../../components/Historique';

export function comments({ navigation }) {

    const [user, setUser] = useState({})
    const [posts, setPost] = useState({})

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

                fetch(`https://offroad-app.herokuapp.com/api/post/user/${decryptToken.id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => response.json())
                .then((responseData) => {
                    setPost(responseData.data)
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

    if (!posts) {
        return <Text>Chargement...</Text>
    }

    if (!posts.post) {
        <View></View>
    } else {
        { posts.post.map((post) => (
            <Historique
              key={post.id}
              id={post.id}
              date={post.createdAt}
              text={post.content}
              note={post.note}
            />
        ))}
    }
   
    return (
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
                    likePress={() => navigation.navigate('')}
                    account={true}
                />
            </View>

            { !posts.post ?
                <View></View>
            :
                posts.post.map((post) => (
                    <Historique
                    key={post.id}
                    id={post.id}
                    date={post.createdAt}
                    text={post.content}
                    note={post.note}
                    />
                ))
            }

            <StatusBar style="auto" />
        </ScrollView>
    ); 
}
