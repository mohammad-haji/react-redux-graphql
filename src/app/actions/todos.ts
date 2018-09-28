import {createAction} from 'redux-actions';
import * as todoApi from "app/apis/todo";

export namespace TodoActions {
  export enum Type {
    LOAD_TODO_list = 'LOAD_TODO_list',
    LOAD_TODO_list_SUCCESS = 'LOAD_TODO_list_SUCCESS',
    LOAD_TODO_list_ERROR = 'LOAD_TODO_list_ERROR',
    CREATE_TODO = 'CREATE_TODO',
    CREATE_TODO__SUCCESS = 'CREATE_TODO_SUCCESS',
    CREATE_TODO__ERROR = 'CREATE_TODO_ERROR',
    UPDATE_TODO = 'UPDATE_TODO',
    UPDATE_TODO__SUCCESS = 'UPDATE_TODO_SUCCESS',
    UPDATE_TODO__ERROR = 'UPDATE_TODO_ERROR',
    REMOVE_TODO = 'REMOVE_TODO',
    REMOVE_TODO__SUCCESS = 'REMOVE_TODO_SUCCESS',
    REMOVE_TODO__ERROR = 'REMOVE_TODO_ERROR',
    ADD_TODO = 'ADD_TODO',
    EDIT_TODO = 'EDIT_TODO',
    DELETE_TODO = 'DELETE_TODO',
    COMPLETE_TODO = 'COMPLETE_TODO',
    COMPLETE_ALL = 'COMPLETE_ALL',
    CLEAR_COMPLETED = 'CLEAR_COMPLETED'
  }

  export const loadTodoList = createAction(Type.LOAD_TODO_list);
  export const loadTodoListSuccess = createAction(Type.LOAD_TODO_list_SUCCESS);
  export const loadTodoTodoListError = createAction(Type.LOAD_TODO_list_ERROR);
  export const createTodo = createAction(Type.CREATE_TODO);
  export const createTodoSuccess = createAction(Type.CREATE_TODO__SUCCESS);
  export const createTodoError = createAction(Type.CREATE_TODO__ERROR);
  export const updateTodo = createAction(Type.UPDATE_TODO);
  export const updateTodoSuccess = createAction(Type.UPDATE_TODO__SUCCESS);
  export const updateTodoError = createAction(Type.UPDATE_TODO__ERROR);
  export const removeTodo = createAction(Type.REMOVE_TODO);
  export const removeTodoSuccess = createAction(Type.REMOVE_TODO__SUCCESS);
  export const removeTodoError = createAction(Type.REMOVE_TODO__ERROR);
  export const addTodo = createAction(Type.ADD_TODO);
  export const editTodo = createAction(Type.EDIT_TODO);
  export const deleteTodo = createAction(Type.DELETE_TODO);
  export const completeTodo = createAction(Type.COMPLETE_TODO);
  export const completeAll = createAction(Type.COMPLETE_ALL);
  export const clearCompleted = createAction(Type.CLEAR_COMPLETED);
}

// TODO: Add Saga to project and handle below actions with it.
export const fetchTodoList = () => (dispatch: any) => {
  TodoActions.loadTodoList();
  todoApi.listAll()
    .then((todoList: any) => {
      dispatch(TodoActions.loadTodoListSuccess(todoList.data.allPosts));
    })
    .catch((err) => {
      dispatch(TodoActions.loadTodoTodoListError(err));
    });
};

export const createTodo = (todo: any) => (dispatch: any) => {
  TodoActions.createTodo();
  todoApi.create(todo)
    .then((res) => {
      let _res = res.data.createPost;
      _res.completed = false;
      dispatch(TodoActions.createTodoSuccess(_res));
      // dispatch(fetchTodoList());
    })
    .catch((err) => {
      dispatch(TodoActions.createTodoError(err));
    });
};

export const updateTodo = (todo: any) => (dispatch: any) => {
  TodoActions.updateTodo();
  todoApi.update(todo)
    .then((value) => {
      dispatch(TodoActions.updateTodoSuccess(value));
    })
    .catch((err) => {
      dispatch(TodoActions.updateTodoError(err));
    });
};

export const deleteTodo = (todoId: any) => (dispatch: any) => {
  TodoActions.removeTodo();
  todoApi.remove(todoId)
    .then((value) => {
      dispatch(TodoActions.removeTodoSuccess(todoId));
    })
    .catch((err) => {
      dispatch(TodoActions.removeTodoError(err));
    });
};

export type TodoActions = Omit<typeof TodoActions, 'Type'>;
