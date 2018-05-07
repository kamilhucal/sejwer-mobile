import React, {Component} from 'react';
import {View, NavigatorIOS, TabBarIOS,} from 'react-native';
import {Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import {StyleSheet} from 'react-native';
import {StackNavigator, HeaderBackButton} from 'react-navigation'
import {NavigationActions} from 'react-navigation'
import {TaBBar} from "../../tabBar";

export class budgetCreate extends Component {
    static navigationOptions = {
        headerTitle: 'Create Budget',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#2c3e50'
        },
        // header: null,
    };


    constructor(props) {

        super(props);
        this.state = {
            error: '',
        };
    }

    async onPressCreateBudgetButton() {
        try {
            let response = await fetch('http://ww   w.sejwer.pl/api/budget', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    name: this.state.budgetName,
                    value: this.state.budgetLimit,
                    createdAt: {
                        year: this.state.budgetStartDate.year,
                        month: this.state.budgetStartDate.month,
                        day: this.state.budgetStartDate.day
                    },
                    expiredAt: {
                        year: this.state.budgetEndDate.year,
                        month: this.state.budgetEndDate.month,
                        day: this.state.budgetEndDate.day
                    },

                })
            });

            let responseJson = response.json();
            if (responseJson.code === 401) {
                this.setState({error: "Złe Dane Logowania"})
                return false;
            } else {

                this.setState({error: null})
                this.setState({success: "Zalogowano Pomyslnie"})
            }
            if (responseJson.token) {
                AsyncStorage.setItem('token', responseJson.token);

                this.props.navigation.navigate('Home')
            }
        } catch (error) {
            console.error(error);
        }

    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.formWrapper}>
                    /*// nazwa value expired_at && created_at */
                    <StatusBar
                        backgroundColor="blue"
                        barStyle="light-content"
                    />
                    <TextInput
                        placeholder="Nazwa Budgetu"
                        returnKeyType={"next"}
                        placeholderTextColor="black"
                        onSubmitEditing={() => {
                            this.nameInput.focus()
                        }}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrection={false}
                        style={styles.input}
                        onChangeText={(value) => this.setState({budgetName: value})}

                    />
                    <TextInput
                        placeholder="Limit"
                        returnKeyType={"next"}
                        placeholderTextColor="black"
                        onSubmitEditing={() => {
                            this.limitInput.focus()
                        }}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrection={false}
                        style={styles.input}
                        onChangeText={(value) => this.setState({budgetLimit: value})}

                    />

                    <TextInput
                        placeholder="Poczatek budgetu"
                        returnKeyType={"next"}
                        placeholderTextColor="black"
                        onSubmitEditing={() => {
                            this.startDateInput.focus()
                        }}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrection={false}
                        style={styles.input}
                        onChangeText={(value) => this.setState({budgetStartDate: value})}

                    />
                    <TextInput
                        placeholder="Koniec Budzetu"
                        returnKeyType={"next"}
                        placeholderTextColor="black"
                        onSubmitEditing={() => {
                            this.passwordInput.focus()
                        }}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrection={false}
                        style={styles.input}
                        onChangeText={(value) => this.setState({budgetEndDate: value})}

                    />
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.onPressCreateBudgetButton.bind(this)}>
                            <Text style={styles.loginTextButton}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
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
        alignItems: 'center',
        fontFamily: 'prestiz',
        color: '#52B3D9',
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontSize: 15,
    },
    subtitleSmall: {
        fontFamily: 'presitz',
        color: 'white',
        textAlign: 'center',
        fontSize: 12,

    },
    titleWrapper: {
        justifyContent: 'center',
        // flex: 0,
        marginBottom: 25,
        marginTop: 10

    },
    footer: {
        marginTop: 100
    },
    errorWrapper: {
        padding: 20
    },
    errorMessage: {
        alignItems: 'center',
        fontFamily: 'prestiz',
        color: '#EC644B',
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontSize: 20,
        // padding: 10
    },
    successMessage: {
        alignItems: 'center',
        fontFamily: 'prestiz',
        color: '#46a940',
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontSize: 20,
        // padding: 10
    },
    formWrapper: {
        padding: 20,
    },
    input: {
        height: 40,
        width: 260,
        backgroundColor: '#bdc3c7',
        marginBottom: 20,
        fontFamily: 'presitz',
        fontSize: 20,
        color: '#2c3e50',
        paddingHorizontal: 20
    },
    buttonWrapper: {
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: '#2c3e50',
        width: 90,
        height: 40

    },
    loginTextButton: {
        textAlign: 'center',
        color: 'silver',
        fontFamily: 'prestiz',
        fontSize: 24,
        paddingTop: 8
    }

});