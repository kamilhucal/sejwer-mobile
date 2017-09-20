import React, {Component} from 'react';
import {View, NavigatorIOS,TabBarIOS,} from 'react-native';
import {Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import {StyleSheet} from 'react-native';
import {StackNavigator, HeaderBackButton} from 'react-navigation'
import {NavigationActions} from 'react-navigation'
import {TaBBar} from "../tabBar";

export class Settings extends Component {
    static navigationOptions = {
        headerTitle: 'Settings',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#2c3e50'
        },
        // header: null,
    };
    constructor(props) {

        super(props);
        this.state = {
            password: '',
            email: '',
            repeatedPassword: '',
            emailError: false,
            error: '',
        };
    }

    render(){
       return <View><Text>kjasdfh</Text></View>
    }
}