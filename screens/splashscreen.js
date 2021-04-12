import React, { Component, component } from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

export default class splash extends Component {
    constructor(props) {
        super();
    }
    
    render() {
        return(
            <View
            style={{
                flex: 1,
                backgroundColor: '#ffffff',
            }}>
                <LottieView 
                source={require('./assets/splash.json')} 
                autoPlay 
                loop = {false}
                speed = {0.5}
                onAnimationFinish = {() => navigation.navigate('dashboard')}/>
            </View>
        )
    }
}