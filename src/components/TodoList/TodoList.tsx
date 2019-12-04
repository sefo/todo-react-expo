import React, { Component } from 'react';
import { View } from 'react-native';
import { subscriber } from '../../services/todo.service';
import Todo from '../Todo/Todo';
import NewTodo from '../NewTodo/NewTodo';
import { styles } from './TodoList.style';
import { todoService } from '../../services/todo.service';

class TodoList extends Component {

    state = { todos: [] };

    componentDidMount() {
        const todos$ = subscriber.subscribe((todos) => { this.setState({ todos }); });
        return () => todos$.unsubscribe();
    }

    renderTodos() {
        const { todos } = this.state;
        return todos.map((todo) => {
            return (
                <Todo
                    key={todo.uuid}
                    delete={this.deleteTodo}
                    todo={todo}
                ></Todo>
            )
        });
    }

    deleteTodo = (uuid: string) => {
        todoService.remove(uuid);
    }

    render() {
        return (
            <View style={styles.Card}>
                {this.renderTodos()}
                <NewTodo></NewTodo>
            </View>
        )
    }
}

export default TodoList;
