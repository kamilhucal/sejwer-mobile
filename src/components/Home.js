import React, {Component} from 'react';
import {View, NavigatorIOS, TabBarIOS,} from 'react-native';
import {Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import {StyleSheet} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {Login} from "./login/login";
import BottomNavigation, {Tab} from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as AsyncStorage from "react-native/Libraries/Storage/AsyncStorage";

export class Home extends Component {
    static navigationOptions = {
        headerTitle: 'Home',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#2c3e50'
        },
        tabBarLabel: 'Home',
        tabBarIcon: () => <Icon size={24} name="home" color="white"/>

    };

    constructor(props) {

        super(props);
        this.state = {
            budget: '',
            hasBudget: false,
            dayExpense: '',
            emailError: false,
            error: '',
        };
    }

    /**
     * @returns {Promise.<void>}
     */
    async componentWillMount() {
        try {
            const token = await   AsyncStorage.getItem('token');
            if (token !== null) {
                let response = await fetch('http://www.sejwer.pl/api/profile', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    }
                });
                let responseJson = await response.json();
                if (await Home.getUserBudget() !== false) {
                    this.setState({hasBudget: true})
                    this.setState({budget: await Home.getUserBudget()})
                }
                if (responseJson.code) {
                    this.props.navigation.push('Login');
                }
            }
        } catch (error) {
            console.log(error);
        }
        console.log(this.state.hasBudget);


    }

    /**
     *
     * @returns {Promise.<*>}
     */
    static async getUserBudget() {
        try {
            const token = await   AsyncStorage.getItem('token');
            if (token !== null) {
                let response = await fetch('http://www.sejwer.pl/api/budget/active', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    }
                });
                let responseJson = await response.json();
                if (responseJson === 'No Active Budget')
                    return false;

                return responseJson;
                // this.props.navigation.push('Login');
            }


        } catch (error) {

        }
    }

    getExpenseByDate(day) {
        this.setState({expense: ''})
        let value = 0;
        if (typeof this.state.budget.expenses !== 'undefined') {
            this.state.budget.expenses.map(expense => {
                let expenseDay = new Date(expense.created_at)
                let calendarDay = new Date(day.dateString);
                if (expenseDay.toString() === calendarDay.toString()) {
                    value += parseInt(expense.value)
                }
            });
            if (value === 0) {
                this.setState({expense: ''});
            } else {
                this.setState({expense: 'You\'ve spent: £ ' + value});
            }
        }

    }


    onPressCreateButton() {
        this.props.navigation.push('Budget');
    }
    render() {
        const calendar = <Calendar hasBudget={this.state.hasBudget}
            // Initially visible month. Default = Date()
                                   current={this.state.budget.created_at}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                                   minDate={'2018-05-01'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                                   maxDate={this.state.budget.expired_at}
            // Handler which gets executed on day press. Default = undefined
                                   onDayPress={(day) => {
                                       this.getExpenseByDate(day)
                                   }}
            // Handler which gets executed on day long press. Default = undefined
                                   onDayLongPress={(day) => {
                                       console.log('selected day', day)
                                   }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                                   monthFormat={'yyyy MM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
                                   onMonthChange={(month) => {
                                       console.log('month changed', month)
                                   }}
            // Hide month navigation arrows. Default = false
                                   hideArrows={true}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
                                   renderArrow={(direction) => (<Arrow/>)}
            // Do not show days of other months in month page. Default = false
                                   hideExtraDays={true}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
                                   disableMonthChange={false}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                                   firstDay={1}
            // Hide day names. Default = false
                                   hideDayNames={true}
            // Show week numbers to the left. Default = false
                                   showWeekNumbers={true}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                                   onPressArrowLeft={substractMonth => substractMonth()}
            // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                                   onPressArrowRight={addMonth => addMonth()}
        />
        const noBudgetMessage =
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>You Have No Budget</Text>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        style={styles.createBudgetButton}
                        onPress={this.onPressCreateButton.bind(this)}
                    >
                        <Text style={styles.createBudgetTextButton}>Create Budget</Text>
                    </TouchableOpacity>
                </View>
            </View>


        return (
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.title}>
                    {this.state.expense}
                </Text>
                {this.state.hasBudget ? calendar : noBudgetMessage}


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
        fontWeight: 'bold',
        marginBottom: 25
    },
    buttonWrapper: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width: 200,
        alignSelf: 'center',
    },
    createBudgetButton: {
        backgroundColor: '#ffffff',
        width: 200,
        height: 40,

    },
    createBudgetTextButton: {
        textAlign: 'center',
        color: '#2c3e50',
        fontFamily: 'prestiz',
        fontSize: 24,
        paddingTop: 8
    }
});