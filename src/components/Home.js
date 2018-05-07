import React, {Component} from 'react';
import {View, NavigatorIOS, TabBarIOS,} from 'react-native';
import {Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import {StyleSheet} from 'react-native';
import {StackNavigator, HeaderBackButton} from 'react-navigation'
import {NavigationActions} from 'react-navigation'
import {TaBBar} from "../tabBar";
import {Login} from "./login/login";
import * as AsyncStorage from "react-native/Libraries/Storage/AsyncStorage";

export class Home extends Component {
    static navigationOptions = {
        headerTitle: 'Home',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#2c3e50'
        },
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

    async componentWillMount() {

        try {
            const value = await   AsyncStorage.getItem('token');
            if (value !== null) {
                let response = await fetch('http://www.sejwer.pl/api/profile', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + value,
                    }
                });
                let responseJson = await response.json();
                if (responseJson.code) {
                    this.props.navigation.push('Login');
                }
            }
        } catch (error) {
            console.log(error);
        }


    }

    render() {
        return <View><Text>kjasdfh</Text></View>
    }
}