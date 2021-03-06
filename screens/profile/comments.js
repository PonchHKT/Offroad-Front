import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {  View, ScrollView } from 'react-native';


import Navbar from '../../components/Navbar';
import Historique from '../../components/Historique';

export function comments({ route, navigation }) {

    const { userInfos } = route.params;

    const [posts, setPost] = useState({})

    useEffect(() => {
        try {

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
                            if(tab[i].id < tab[i+1].id) {
                                let tmp = tab[i];
                                tab[i] = tab[i+1];
                                tab[i+1] = tmp;
                                changed = true;
                            }
                        }
                    } while(changed);
                }
                sort(responseData.data.post)
                setPost(responseData.data)
            })
            .catch((error) =>{
                console.error(error);
            })
        } catch(e) {
            console.log(e)
        }
    },[])

    if (!posts.post) {
        return <View></View>
    }
   
    return (
        <ScrollView>
            <View style={{marginBottom: 30}}>
                <Navbar
                    key={1}
                    id={1}
                    dashboard={false}
                    mapPress={() => navigation.navigate('dashboard')}
                    plus={false}
                    plusPress={() => navigation.navigate('addspot', {userInfos: user})}
                    like={false}
                    likePress={() => navigation.navigate('like', {userInfos: userInfos})}
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
                        actionsbtn={() => navigation.navigate('spot', { spotId: post.spotId, userInfos: userInfos})}
                    />
                ))
            }

            <StatusBar style="auto" hidden={true}/>
        </ScrollView>
    ); 
}
