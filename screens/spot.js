import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableWithoutFeedback, ScrollView, Alert } from 'react-native';
import Spot from '../assets/images/spots/forest.jpg';
import {FontAwesome} from '@expo/vector-icons';
import Separator from '../components/Separator2';

const numStars = 5

export function spot({ navigation }) {

    let stars = []

    for (let x = 1; x <= numStars; x++) {
        stars.push(
            <TouchableWithoutFeedback key={x}>
                <Star />
            </TouchableWithoutFeedback>
        )
    }
    return (

    <ImageBackground style={styles.backgroundContainer}>
    <ScrollView>
        <Image source={Spot} style={styles.imageSpot}></Image>
        
        <View>
            <Text style={styles.noteText}>Note :</Text>
            <View style={{ flexDirection: "row"}}>{stars}</View>
        </View>
        <Separator></Separator>
        <View>

            <View>
                <Text style={styles.user}>[USERNAME], [LEVEL]</Text>
            </View>

            <View>
                <Text style={styles.description}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic</Text>
            </View>

        </View>
    </ScrollView>
    </ImageBackground>
    )
};

class Star extends React.Component {
    render() {
        return (
            <FontAwesome name="star" color="black" size={32} style={styles.stars}/>
        )
    } 
}

const styles = StyleSheet.create({
    imageSpot: {
        flex:1,
        width: 360,
        height: 250,
        marginTop: 25,
    },
    backgroundContainer: {
        resizeMode: "cover", 
        flex:1, 
        height: '100%', 
        width: '100%',
    },
    noteText: {
        fontSize: 20,
        left: 20,
        marginTop: 10,
        color: '#606060',
    },
    stars: {
        marginHorizontal: 4,
        left: 15,
        marginTop: 5,
    },
    user: {
        fontWeight: 'bold',
        color: '#606060',
        fontSize: 16,
        left: 10,
        marginTop: 5,
    },
    description: {
        color: '#606060',
        fontSize: 10,
        left: 10,
        marginTop: 5,
    },
})
