import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert, Dimensions, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

import Navbar from '../components/Navbar';
import Historique from '../components/Historique';

export function comments({ navigation }) {

    const [user, setUser] = useState({})
    const [posts, setPost] = useState({
            post: [
                {
                    "id": 2,
                    "content": "Endroit vraiment kool avec baucoup de dune on peu eskalader et fair des sot en cross. Le térin est pa priver donk tout le monde peu yaller donk je met cinque étoiles vous pouvé allez voir si vou voulait.",
                    "note": "2",
                    "createdAt": "2021-04-07T12:57:07.879Z",
                    "updatedAt": "2021-04-07T12:57:07.879Z",
                    "spotId": 1,
                    "authorId": 3
                },
                {
                    "id": 3,
                    "content": "blabla",
                    "note": "2",
                    "createdAt": "2021-04-07T13:05:54.815Z",
                    "updatedAt": "2021-04-07T13:05:54.816Z",
                    "spotId": 1,
                    "authorId": 3
                }
            ]
        })

    // useEffect(() => {
    //   try {
    //     const value = AsyncStorage.getItem('token')
    //     .then((token) => { 
    //       const decryptToken = jwt_decode(token);

    //       fetch(`https://offroad-app.herokuapp.com/api/users/${decryptToken.id}`, {
    //         method: "GET",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + token
    //         },
    //         })

    //         .then((response) => response.json())
    //         .then((responseData) => {

    //             setUser(responseData.data.user)

    //             fetch(`https://offroad-app.herokuapp.com/api/post/user/${decryptToken.id}`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //             })
    //             .then((response) => response.json())
    //             .then((responseData) => {
    //                 setPost(responseData.data)
    //             })

    //             .catch((error) =>{
    //                 console.error(error);
    //             })

    //         })

    //       .catch((error) =>{
    //           console.error(error);
    //       }) 

    //     })
    //   } catch(e) {
    //     console.log(e)
    //   }
    // },[])

    if (!posts) {
        return <Text>Chargement...</Text>
    }
   
    return (
        <ScrollView>
            <View>
                <Navbar 
                    key={1}
                    id={1}
                    dashboard={false}
                    plus={false}
                    plusPress={() => navigation.navigate('')}
                    like={false}
                    likePress={() => navigation.navigate('')}
                    account={true}
                />
            </View>

            { posts.post.map((post) => (
                <Historique
                  key={post.id}
                  id={post.id}
                  date={post.createdAt}
                  text={post.content}
                  note={post.note}
                />
            ))}

            <StatusBar style="auto" />
        </ScrollView>
    ); 
}
