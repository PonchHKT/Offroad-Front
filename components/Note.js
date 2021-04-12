import React from 'react';
import { View } from "react-native";
import Stars from 'react-native-stars';

export default function Note(props) {
    
    return (
        <View style={{right: 85}}>
            { props.edit ?
            <Stars
                half={true}
                default={0}
                update={props.update}
                spacing={props.spacing}
                count={5}
                starSize={props.size}
                fullStar={require('../assets/images/starFilled.png')}
                emptyStar={require('../assets/images/starEmpty.png')}/>
            :
            <Stars
                display={props.note}
                spacing={props.spacing}
                count={5}
                starSize={props.size}
                fullStar={require('../assets/images/starFilled.png')}
                emptyStar={require('../assets/images/starEmpty.png')}/>
            }
        </View>
    )
}