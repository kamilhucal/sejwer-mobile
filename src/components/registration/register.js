import React, {Component} from 'react';
import {View} from 'react-native';
import {Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import {StyleSheet} from 'react-native';
import * as Globals from "../../helpers/Globals";




export class Register extends Component {

    constructor(props) {

        console.log(Globals.default.API_URL);
        super(props);
        this.state = {
            password: null,
            email: null,
            repeatedPassword: null,
            emailError: false,
            error: null,
            gowno: this.props.navigation,
        };
    }

    static navigationOptions = {
        headerTitle: 'Register',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#2c3e50'
        }
    };
    validateEmail = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    validatePassword = (password) => {
        let regex = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))/;
        return regex.test(password)
    }
    validateRepeatedPassword(password, repeatedPassword) {
        if (password === repeatedPassword) {
            return true
        }
        return false
    }

    async onPressRegisterButton() {


    if(this.state.email && this.state.password && this.state.repeatedPassword){
            try {

                let response = await fetch('http:/www.sejwer.pl/api/register', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                        plainPassword: {
                            first: this.state.password,
                            second: this.state.repeatedPassword
                        }
                    })

                });
                if(response.status != 201){
                    this.setState({error: "Uzytkownik istnieje"})
                    return false
                }
                this.state.gowno.navigate('Home',{message: 'success'});
            } catch (error) {
                console.error(error);
            }
    } else{
        this.setState({error: "Brak danych logowania"})
    }

    }


    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.titleWrapper}>
                    <Text>
                        <Text style={styles.title}>SEJWER</Text>
                        <Text style={styles.titledot}>.</Text>
                        <Text style={styles.title}>PL</Text>
                    </Text>
                </View>
                <View style={styles.registerFormWrapper}>
                    <StatusBar
                        backgroundColor="blue"
                        barStyle="light-content"
                    />
                    <TextInput
                        placeholder="adres email"
                        returnKeyType={"next"}
                        placeholderTextColor="black"
                        onSubmitEditing={() => {
                            if (!this.validateEmail(this.state.email)) {
                                this.setState({error: 'Podales nieprawidlowy e-mail'})
                            }
                            else {
                                this.setState({error: null});
                                this.passwordInput.focus();
                            }
                        }}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrection={false}
                        style={styles.input}
                        onChangeText={
                            (value) => this.setState({email: value})
                        }
                    />
                    <TextInput
                        placeholder="haslo"
                        placeholderTextColor="black"
                        secureTextEntry
                        returnKeyType={"next"}
                        onSubmitEditing={() => {
                            if (!this.validatePassword(this.state.password)) {
                                this.setState({error: 'Haslo musi zawierac 1 duza 1 mala i cyfre i 6 znakow'})
                            }
                            else {
                                this.setState({error: null});
                                this.repeatedPasswordInput.focus()
                            }

                        }}
                        ref={(input) => this.passwordInput = input}
                        onChangeText={(value) => this.setState({password: value})}
                        style={styles.input}/>
                    <TextInput
                        placeholder="powtorz haslo"
                        placeholderTextColor="black"
                        secureTextEntry
                        returnKeyType={"go"}
                        ref={(input) => this.repeatedPasswordInput = input}
                        onChangeText={
                            (value) => this.setState({repeatedPassword: value})

                        }
                        onEndEditing={() => {
                            if (!this.validateRepeatedPassword(this.state.password, this.state.repeatedPassword)) {
                                this.setState({error: 'Hasła się nie zgadzają'})
                            }
                            else {
                                this.setState({error: null});
                            }
                        }
                        }

                        style={styles.input}/>
                    <View style={styles.buttonWrapper}>

                        <TouchableOpacity
                            style={styles.registerButton}
                            onPress={
                                this.onPressRegisterButton.bind(this)
                            }>
                            <Text style={styles.registerTextButton}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.errorWrapper}>
                    <Text style={styles.errorMessage}>
                        {this.state.error}
                    </Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.subtitleSmall}>Designed by PatCam Inc.</Text>
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
        fontSize: 20
    },
    registerFormWrapper: {
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
    registerButton: {
        backgroundColor: '#2c3e50',
        width: 120,
        height: 40

    },
    registerTextButton: {
        textAlign: 'center',
        color: 'silver',
        fontFamily: 'prestiz',
        fontSize: 24,
        paddingTop: 8
    }
});