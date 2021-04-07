import React from 'react';
import { Image, StyleSheet, Text, View } from "react-native";
import Note from './Note';

export default function Historique(props) {

    const styles = StyleSheet.create({
        
    });   
    
    function convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        let d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
    }
    
    return (
        <View>
            <Text>{convertDate(props.date)}</Text>
            { props.image ? 
                <Image 
                
                />
            :
                <Text>
                    {props.text}
                </Text>
            }
            <Note 
                key={props.id}
                note={props.note}
            />
        </View>
    )
}