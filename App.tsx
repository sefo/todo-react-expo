import React, { Component } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { StyleSheet, View } from 'react-native';
import TodoList from './src/components/TodoList/TodoList';

class App extends Component {

  state = { isLoadingComplete: false };

  render() {
    const { isLoadingComplete } = this.state;
    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onFinish={() => this.finishLoading()}
        />
      );
    }
    return (
      <View style={styles.container}>
        <TodoList></TodoList>
      </View>
    )
  };

  loadResourcesAsync = async () => {
    await Promise.all([
      Font.loadAsync({
        'indie-flower': require('./assets/fonts/IndieFlower.ttf'),
      }),
    ]);
  }

  finishLoading = () => this.setState({ isLoadingComplete: true });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;