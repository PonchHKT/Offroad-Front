import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Spot from '../assets/images/spots/forest.jpg';
export function spot({ navigation }) {

    return (

    <ImageBackground style={styles.backgroundContainer}>
    <ScrollView>
        <Image source={Spot} style={styles.imageSpot}></Image>
        
    </ScrollView>
    </ImageBackground>
    )
};

const styles = StyleSheet.create({
    imageSpot: {
        flex:1,
        width: 250,
        height: 100,
    },
    backgroundContainer: {
        resizeMode: "cover", 
        flex:1, 
        height: '100%', 
        width: '100%',
    },
})
