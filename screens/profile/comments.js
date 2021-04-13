import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {  View, ScrollView, Text } from 'react-native';


import Navbar from '../../components/Navbar';
import Historique from '../../components/Historique';

export function comments({ route, navigation }) {

    const { spotId, userInfos, token } = route.params;

    const [user, setUser] = useState({})
    const [posts, setPost] = useState({})

    useEffect(() => {
        try {
            fetch(`https://offroad-app.herokuapp.com/api/users/${userInfos.id}`, {
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

                    fetch(`https://offroad-app.herokuapp.com/api/post/user/${userInfos.id}`, {
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
                        sort(responseData.data.post)
                        setPost(responseData.data.post)
                        console.log('AH')
                        console.log(posts.post)
                    })

                    .catch((error) =>{
                        console.error(error);
                    })

                })

            .catch((error) =>{
                console.error(error);
            })
        } catch(e) {
            console.log(e)
        }
    },[])

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
                posts.post.map((post, index) => (
                    <Historique
                        key={index}
                        date={post.createdAt}
                        text={post.content}
                        note={post.note}
                    />
                ))
            }

            <StatusBar style="auto" hidden={true}/>
        </ScrollView>
    ); 
}
