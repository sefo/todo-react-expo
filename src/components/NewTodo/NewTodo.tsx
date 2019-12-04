import React, { Component } from 'react';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './NewTodo.style';
import { todoService } from '../../services/todo.service';
import { uuid } from '../../utils/uuid';

interface LocalProps { };
interface LocalState { todo: string; };
const newTodo$ = new Subject();

class NewTodo extends Component<LocalProps, LocalState> {

    private todoInput: React.RefObject<Input>;

    constructor(props: LocalProps) {
        super(props);
        this.state = { todo: "" };
        this.todoInput = React.createRef();
    }

    componentDidMount() {
        newTodo$
            .pipe(debounceTime(300))
            .subscribe((todo: string) => this.setState({ todo }));
        return () => newTodo$.unsubscribe();
    }

    render() {
        return (
            <View style={styles.New}>
                <Input
                    ref={this.todoInput}
                    placeholder='Enter a new todo item'
                    onChangeText={todo => this.add(todo)} />
                <Button
                    icon={<Icon name="corner-right-up" color="#2089dc" size={20} />}
                    type="clear"
                    onPress={this.create} />
            </View>
        )
    }
    add = (todo: string) => newTodo$.next(todo);
    create = () => {
        todoService.add({ uuid: uuid(), content: this.state.todo, done: false });
        this.setState({ todo: "" });
        this.todoInput.current.clear();
    };
}

export default NewTodo;
