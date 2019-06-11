import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import * as TaskManager from 'expo-task-manager'

const BACKGROUND_UPDATE ='BACKGROUND_LOCATION_UPDATE'
TaskManager.defineTask(BACKGROUND_UPDATE, async ({ data: { locations }, error }) => {
    console.log('Sending Location')
    fetch('http://192.168.0.38:8000/location/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // Authorization: 'Token ' + token
        },
        body: JSON.stringify({
            location: locations,
        }),
    }).then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
});
export default class App extends Component {
    state = {
        location: null,
        errorMessage: null,
    };

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        let providerStatus = await Location.getProviderStatusAsync();
        if (!providerStatus.locationServicesEnabled) {
            this.setState({
                errorMessage: 'Location Services Disabled'
            })
            return;
        }

        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
            return
        }

        Location.startLocationUpdatesAsync(BACKGROUND_UPDATE, { accuracy: Location.Accuracy.Low, timeInterval: 4000})
        // let location = await Location.getCurrentPositionAsync({});
        // this.setState({ location });
    };

    render() {
        let text = 'Waiting..';
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (this.state.location) {
            text = JSON.stringify(this.state.location);
        }

        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>{text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
    },
});