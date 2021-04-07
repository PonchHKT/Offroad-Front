import React from 'react';
import { StyleSheet, View } from "react-native";
import Stars from 'react-native-stars';

export default function Note(props) {

    const styles = StyleSheet.create({
        
    });   
    
    
    return (
        <View style={{alignItems:'center'}}>
        <Stars
            display={props.note}
            spacing={8}
            count={5}
            starSize={40}
            fullStar={require('../assets/images/starFilled.png')}
            emptyStar={require('../assets/images/starEmpty.png')}/>
        </View>
    )
}