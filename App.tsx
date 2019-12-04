import React from 'react';
import { StyleSheet, View } from 'react-native';
import TodoList from './src/components/TodoList/TodoList';

export default function App() {
  return (
    <View style={styles.container}>
      <TodoList></TodoList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
