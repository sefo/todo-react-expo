import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from './Todo.style';
import { CheckBox, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';

interface LocalProps { todo: any; delete: Function, done: Function };
interface LocalState { checked: boolean; };

class Todo extends Component<LocalProps, LocalState> {

    constructor(props: LocalProps) {
        super(props);
        this.state = {
            checked: false
        };
    }

    render() {
        const { todo } = this.props;
        return (
            <View style={styles.Container}>
                <CheckBox onPress={this.toggle} checked={this.state.checked} />
                <Text
                    style={[
                        styles.Todo,
                        todo.done ? { 'textDecorationLine': 'line-through' } : { 'textDecorationLine': 'none' }]
                    }>{todo.content}</Text>
                <Button
                    icon={<Icon name="trash" color="#2089dc" size={20} />}
                    type="clear"
                    onPress={this.delete} />
            </View>
        )
    }
    delete = () => this.props.delete(this.props.todo.uuid);
    toggle = () => {
        this.setState((prev: LocalState) => ({ checked: !prev.checked }));
        this.props.done(this.props.todo.uuid);
    };
}

export default Todo;
