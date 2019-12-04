import { BehaviorSubject } from 'rxjs';
import { Todo } from '../interfaces/Todo';

const subscriber = new BehaviorSubject([]);

const todoService = {
    add: (todo: Todo) => {
        subscriber.next([...subscriber.getValue(), todo]);
    },
    remove: (uuid: string) => {
        const todos = subscriber.getValue().filter((todo) => todo.uuid !== uuid);
        subscriber.next(todos);
    }
};

export {
    todoService,
    subscriber
}