/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component,PropTypes} from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {Login} from './src/components/login/login';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
    TabBarIOS,
} from 'react-native';
import {Register} from "./src/components/registration/register";
import {Home} from "./src/components/Home";
import {Settings} from "./src/components/Settings";
export default class sejwer_nejtiv extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        navigator: PropTypes.object.isRequired,
    }
    render() {
        return (
         <NavigatorIOS
            initialRoute={{
                component: Home,
                title: 'My Initial Scene',
            }}
            style={{flex: 1}}
            barTintColor='#ffffcc'
        />
        );
    }
}

const TabsStack = TabNavigator({
    TabOne: { screen: Home }},
    {
    tabBarPosition: 'top',
    animationEnabled: false,
});

const SimpleApp = StackNavigator({
    Login: {screen: Login},
    Register: {screen: Register},
    // StackInside: {screen: TabsStack},

});
AppRegistry.registerComponent('sejwer_nejtiv', () => SimpleApp);
