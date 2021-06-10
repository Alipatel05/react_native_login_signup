import React, { Component } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { Card } from "react-native-shadow-cards";
import Spinner from "react-native-loading-spinner-overlay";

export default class tabA extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      Spinner: false,
    };
  }

  componentDidMount() {
    this.setState({ Spinner: true });
    fetch("https://reactnative.dev/movies.json")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.movies });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
        this.setState({ Spinner: false });
      });
  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, padding: 5 }}>
        <Spinner visible={this.state.Spinner} color="#696969"></Spinner>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Card
                cardElevation={2}
                cardMaxElevation={2}
                cornerRadius={5}
                style={{ padding: 5, margin: 5 }}
              >
                <Text>
                  {item.title}, {item.releaseYear}
                </Text>
              </Card>
            )}
          />
        )}
      </View>
    );
  }
}
