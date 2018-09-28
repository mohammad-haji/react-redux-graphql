import * as React from 'react';
import * as style from './style.css';
import {TodoItem} from '../TodoItem';
import {TodoModel} from 'app/models/TodoModel';

export namespace TodoList {
  export interface Props {
    todos: TodoModel[];
    onUpdate: any;
    onDelete: any;
  }
}

export class TodoList extends React.Component<TodoList.Props> {
  render() {
    const {todos, onUpdate, onDelete} = this.props;
    return (
      <section className={style.main}>
        <table className={style.normal}>
          <tbody>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={(data:any)=>onUpdate(data)}
              onDelete={(data:any)=>onDelete(data)}
            />
          ))}
          </tbody>
        </table>
      </section>
    );
  }
}

// {/*completeTodo={actions.listActions.updateTodo}*/}
// {/*deleteTodo={actions.listActions.updateTodo}*/}
// {/*editTodo={actions.listActions.updateTodo}*/}
