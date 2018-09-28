import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import {TodoActions, fetchTodoList, createTodo, updateTodo, deleteTodo} from 'app/actions';
import { RootState } from 'app/reducers';
import { TodoModel } from 'app/models';
import { omit } from 'app/utils';
import { AddTodo, TodoList, Filters } from 'app/components';

const FILTER_VALUES = (Object.keys(TodoModel.Filter) as (keyof typeof TodoModel.Filter)[]).map(
  (key) => TodoModel.Filter[key]
);

const FILTER_FUNCTIONS: Record<TodoModel.Filter, (todo: TodoModel) => boolean> = {
  [TodoModel.Filter.SHOW_ALL]: () => true,
  [TodoModel.Filter.SHOW_ACTIVE]: (todo) => !todo.completed,
  [TodoModel.Filter.SHOW_COMPLETED]: (todo) => todo.completed
};

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    todos: RootState.TodoState;
    actions: TodoActions;
    getTodoList: any,
    createTodo: any,
    updateTodo: any,
    deleteTodo: any,
    filter: TodoModel.Filter;
  }
}

@connect(
  (state: RootState): Pick<App.Props, 'todos' | 'filter'> => {
    const hash = state.router.location && state.router.location.hash.replace('#', '');
    const filter = FILTER_VALUES.find((value) => value === hash) || TodoModel.Filter.SHOW_ALL;
    return { todos: state.todos, filter };
  },
  (dispatch: Dispatch)=> ({
    actions: bindActionCreators(omit(TodoActions, 'Type'), dispatch),
    getTodoList: (todo: any)=>(fetchTodoList()(dispatch)),
    createTodo: (todo: any)=>{createTodo(todo)(dispatch);},
    updateTodo: (todo: any)=>{updateTodo(todo)(dispatch);},
    deleteTodo: (todoId: any)=>{deleteTodo(todoId)(dispatch)}
  })
)
export class App extends React.Component<App.Props> {
  static defaultProps: Partial<App.Props> = {
    filter: TodoModel.Filter.SHOW_ALL
  };

  constructor(props: App.Props, context?: any) {
    super(props, context);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount(){
    this.props.getTodoList('sdfdf');
  }

  handleClearCompleted(): void {
    const hasCompletedTodo = this.props.todos.some((todo) => todo.completed || false);
    if (hasCompletedTodo) {
      this.props.actions.clearCompleted();
    }
  }

  handleFilterChange(filter: TodoModel.Filter): void {
    this.props.history.push(`#${filter}`);
  }

  render() {
    const { todos, filter , createTodo, deleteTodo, updateTodo} = this.props;
    const filteredTodos = filter ? todos.filter(FILTER_FUNCTIONS[filter]) : todos;
    const completedCount = todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);

    return (
      <div className={style.normal}>
        <h1>Todo List</h1>
        <AddTodo addTodo={(todo)=>createTodo(todo)} />
        <Filters
          filter={filter}
          completedCount={completedCount}
          onClickClearCompleted={this.handleClearCompleted}
          onClickFilter={this.handleFilterChange}
        />
        <TodoList todos={filteredTodos} onUpdate={updateTodo} onDelete={deleteTodo} />
      </div>
    );
  }
}
