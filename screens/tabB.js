import React from 'react';
import {StyleSheet, View, Text } from 'react-native';

export default class tabB extends React.Component {
    render() {
        return (
            <View style = {styles.container}>
                <Text>Hello tabB</Text>
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