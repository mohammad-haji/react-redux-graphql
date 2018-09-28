import {handleActions} from 'redux-actions';
import {TodoActions} from 'app/actions/todos';

const initialState = [
  {
    id: 1,
    text: 'App compeleted',
    completed: true
  }
];

export const todoReducer = handleActions(
  {
    [TodoActions.Type.LOAD_TODO_list_SUCCESS]: (state, action: any)=> {
      return [...initialState, ...action.payload];
    },
    [TodoActions.Type.ADD_TODO]: (state, action: any) => {
      if (action.payload && action.payload.text) {
        return [
          {
            id: state.reduce((max, todo) => Math.max(todo.id || 1, max), 0) + 1,
            completed: false,
            text: action.payload.text
          },
          ...state
        ];
      } else {
        return state;
      }
    },
    [TodoActions.Type.REMOVE_TODO__SUCCESS]: (state, action) => {
      return state.filter((todo) => todo.id !== (action.payload as any));
    },
    [TodoActions.Type.CREATE_TODO__SUCCESS]: (state, action: any) => {
      return [...state, ...[action.payload]]
    }
  },
  initialState
);
