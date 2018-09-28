import {graphQLQuery, graphQLMutate} from '../../utils/request';
import {listTodosQuery, createTodoQuery, updateTodoQuery, deleteTodoQuery} from './queries';

export const listAll = ()=> {
  return graphQLQuery(listTodosQuery)
};

export const create = (params: any)=> {
  return graphQLMutate(createTodoQuery(params))
};

export const update = (params: any)=> {
  return graphQLMutate(updateTodoQuery(params))
};

export const remove = (todoId: any)=> {
  return graphQLMutate(deleteTodoQuery(todoId))
};

