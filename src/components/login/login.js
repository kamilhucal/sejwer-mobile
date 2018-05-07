import React, {Component} from 'react';
import {View, Button} from 'react-native';
import {Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StatusBar, AsyncStorage} from 'react-native';
import {StyleSheet} from 'react-native';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            email: '',
            error: '',
            navigation: this.props.navigation,
        };
    }

    static navigationOptions = {
        drawerLabel: 'Home',
    };


    static navigationOptions = {
        headerTitle: 'Login',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#2c3e50'
        }

    };

    async onPressLoginButton() {
        try {
            let response = await fetch('http://www.sejwer.pl/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.email,
                    password: this.state.password,
                })
            });

            let responseJson = await response.json();
            console.log(responseJson);
            if (responseJson.code === 401) {
                this.setState({error: "Złe Dane Logowania"})
                return false;
            }
            else {
                if (this.state.error) {
                    this.setState({error: null})
                }
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

    redirectToHome(result) {
        if (result) {
            this.props.navigation.navigate('Home');
        }
    }

    async componentWillMount() {

        try {
            const value = await   AsyncStorage.getItem('token');
            if (value !== null) {
                this.state.navigation.navigate('Home',{message: 'success'});
                if (this.props.navigation.state.params) {
                    this.setState({success: this.props.navigation.state.params.message})
                }
            }
        } catch (error) {
            console.error(error)
            // Error retrieving data
        }

    }

    render() {

        const {navigate} = this.props.navigation;

        console.log(navigate);
        // if(this.props.navigation.state.params.message) {
        //     const {params} = this.props.navigation;
        // }

        return (

            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.titleWrapper}>
                    <Text>
                        <Text style={styles.title}>SEJWER</Text>
                        <Text style={styles.titledot}>.</Text>
                        <Text style={styles.title}>PL</Text>
                    </Text>
                </View>
                <View style={styles.loginFormWrapper}>

                    <StatusBar
                        backgroundColor="blue"
                        barStyle="light-content"
                    />
                    <TextInput
                        placeholder="adres email"
                        returnKeyType={"next"}
                        placeholderTextColor="black"
                        onSubmitEditing={() => {
                            this.passwordInput.focus()
                        }}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrection={false}
                        style={styles.input}
                        onChangeText={(value) => this.setState({email: value})}

                    />
                    <TextInput
                        placeholder="haslo"
                        placeholderTextColor="black"
                        secureTextEntry
                        returnKeyType={"go"}
                        ref={(input) => this.passwordInput = input}
                        onChangeText={(value) => this.setState({password: value})}
                        style={styles.input}/>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={this.onPressLoginButton.bind(this)}>
                            <Text style={styles.loginTextButton}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={styles.subtitleSmall}>Nie masz konta?</Text>
                    <Text
                        onPress={() => navigate('Register')}
                        style={styles.subtitle}>Zarejestruj sie!</Text>
                </View>
                <View style={styles.errorWrapper}>
                    <Text style={styles.errorMessage}>{this.state.error} </Text>
                    <Text style={styles.successMessage}>{this.state.success}
                    </Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.subtitleSmall}>Designed by Webstork Inc.</Text>
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
    loginFormWrapper: {
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