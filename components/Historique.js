import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, Dimensions, View, TouchableOpacity, Alert } from "react-native";
import CustomButton from './CustomButton';
import Note from './Note';
import heart from '../assets/images/heart.png';

import Separator from '../components/Separator3';

const { width: WIDTH } = Dimensions.get('window')

export default function Historique(props) {
    
    const[spot, setSpot] = useState({})
       
    if(!props.note) {

        useEffect(() => {
            try {
                fetch(`https://offroad-app.herokuapp.com/api/spot/unique/${props.spot}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => response.json())
                .then((responseData) => {
                    setSpot(responseData.data.spot)
                })
                .catch((error) =>{
                    console.error(error);
                })
            } catch(e) {
                console.log(e)
            }
        },[])

        if (!spot.note) {
            return <View></View>
        }
    }

    const unLike = () => {
        fetch(`https://offroad-app.herokuapp.com/api/like/delete/${props.like}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            if(responseData.data.like) {
                Alert.alert('Le spot a bien été retiré des favoris !')
            }
        })
        .catch((error) =>{
            console.error(error);
        })
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 10,
            paddingLeft: 20,
            paddingRight: 20
        },
        container2: {
            paddingBottom: 10,
        },
        title: {
            fontSize: 22,
            paddingBottom: 10,
            marginTop: 10,
        },
        bottom: {
            flex: 1,
            flexDirection: 'row',
            paddingTop: 10,
            paddingRight: 20,
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        imageSpot: {
            height: 150,
            borderRadius: 25,
        },
    });   
    
    function convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        let d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
    }
    
    return (
        <View style={styles.container}>
            
            <View style={styles.container2}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', left: 10}}>
                    <Text style={styles.title}>{convertDate(props.date)}</Text>
                    { props.like ? 
                        <TouchableOpacity style={{left: 10}} onPress={() => unLike()}>
                            <Image source={heart} style={{width: 25, height: 25,}}/>
                        </TouchableOpacity>
                    :
                        <View></View>
                    }
                </View>
                { props.image ? 
                    <Image 
                        source={{uri: spot.photo}}
                        style={styles.imageSpot}
                    />
                :
                    <Text>
                        {props.text}
                    </Text>
                }
                <View style={styles.bottom}>
                    <Note 
                        key={props.id}
                        note={props.note ? props.note : spot.note}
                        edit={false}
                        spacing={4}
                        size={25}
                    />
                    <CustomButton
                        key={1}
                        title={'Voir'}
                        width={250}
                        actionsbtn={props.actionsbtn}
                    />
                </View>
            </View>
            
            <Separator />

        </View>
        
    )
}