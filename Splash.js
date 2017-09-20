import React, {Component} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native';
import {StyleSheet} from 'react-native';

export class Splash extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleWrapper}>
                    <Text>
                        <Text style={styles.title}>SEJWER</Text>
                        <Text style={styles.titledot}>.</Text>
                        <Text style={styles.title}>PL</Text>
                    </Text>
                </View>
                <View>
                    <Text style={styles.subtitle}>Designed by PatCam Inc.</Text>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#34495e',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontFamily: 'Montserrat-Light',
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold'
    },
    titledot: {
        fontFamily: 'Montserrat-Light',
        color: 'red',
        fontSize: 35,
        fontWeight: 'bold'
    },
    subtitle: {
        fontFamily: 'presitz',
        color: 'white',
        fontWeight: '200'
    },
    titleWrapper: {
        justifyContent: 'center',
        flex: 1
    }


});