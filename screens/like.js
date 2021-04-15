import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {  View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

import Navbar from '../components/Navbar';
import Historique from '../components/Historique';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

export function like({ route, navigation }) {

    const { userInfos } = route.params;

    const [likes, setLike] = useState({})

    useEffect(() => {
        try {
            fetch(`https://offroad-app.herokuapp.com/api/like/${userInfos.id}`, {
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
                sort(responseData.data.like)
                setLike(responseData.data)
            })
            .catch((error) =>{
                console.error(error);
            })
        } catch(e) {
            console.log(e)
        }
    },[])

    if (!likes.like) {
        return <View></View>
    }
   
    return (
        <View style={styles.backgroundContainer}>
        <LottieView
            resizeMode={'cover'}
            source={require('../assets/likebackground.json')} 
            autoPlay
            loop= {false}
            speed={1}
            onAnimationFinish={{width: 0, height: 0}}
            />
        <ScrollView>
            <View style={{zIndex: 1000}}>
                <Navbar
                    key={1}
                    id={1}
                    dashboard={false}
                    mapPress={() => navigation.navigate('dashboard')}
                    plus={false}
                    plusPress={() => navigation.navigate('addspot', {userInfos: userInfos})}
                    like={true}
                    account={false}
                    accountPress={() => navigation.navigate('profil', {userInfos: userInfos})}
                />
            </View>

            { !likes.like ?
                <View></View>
            :
                likes.like.map((like, index) => (
                    <Historique
                        key={index}
                        date={like.createdAt}
                        image={true}
                        spot={like.spotId}
                        like={like.id}
                        actionsbtn={() => navigation.navigate('spot', { spotId: like.spotId, userInfos: userInfos})}
                    />
                ))
            }
            <StatusBar style="auto" hidden={true}/>
        </ScrollView>
        </View>
    ); 
}

const styles = StyleSheet.create({
    backgroundContainer: {
        height: HEIGHT, 
        width: WIDTH,
        backgroundColor: 'white',
    },
})
