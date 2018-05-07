/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {Login} from './src/components/login/login';
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
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
import {budgetCreate} from "./src/components/budget/budgetCreate";

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
/**
 * Screen for third tab.
 * You usually will have this in a separate file.
 */
class Books extends Component {
    static navigationOptions = {
        headerTitle: 'Home',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#2c3e50'
        },
        tabBarLabel: 'Settings',
        tabBarIcon: () => <Icon size={24} name="account-box" color="white" />
    }

    render() {
        return (
            <View>
                <Text>Settings</Text>
            </View>
        )
    }
}

class Wallet extends Component {
    static navigationOptions = {
        headerTitle: 'Home',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#2c3e50'
        },
        tabBarLabel: 'Wallet',
        tabBarIcon: () => <Icon size={24} name="euro-symbol" color="white" />
    }

    render() {
        return (
            <View>
                <Text>Wallet</Text>
            </View>
        )
    }
}

const TabsStack = TabNavigator({
        Home: {screen: Home},
        Books: { screen: Books },
        Wallet: { screen: Wallet }
    },
    {
        tabBarComponent: NavigationComponent,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            bottomNavigationOptions: {
                labelColor: 'white',
                rippleColor: 'white',
                tabs: {
                    Home: {
                        barBackgroundColor: '#37474F',
                    },
                    Wallet: {
                        barBackgroundColor: '#37474F',
                    },
                    Settings: {
                        barBackgroundColor: '#37474F',
                    }
                }
            }
        },
        animationEnabled: false,
    });

const SimpleApp = StackNavigator({
    Home: {screen: TabsStack},
    Login: {screen: Login},
    Budget: {screen: budgetCreate},
    Register: {screen: Register},

});
AppRegistry.registerComponent('sejwer_nejtiv', () => SimpleApp);
