import React, {Component} from 'react';
import {View, NavigatorIOS,TabBarIOS,} from 'react-native';
export class TaBBar extends Component {
    static navigationOptions = {
        headerTitle: 'Home',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#2c3e50'
        },
        header: null,
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