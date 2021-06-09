import React from 'react';
import {StyleSheet, View, Text } from 'react-native';

export default class tabA extends React.Component {
    render() {
        return (
            <View style = {styles.container}>
                <Text>Hello tabA</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
})