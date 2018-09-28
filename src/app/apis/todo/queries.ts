import gql from 'graphql-tag'

export const listTodosQuery = gql`{
  allPosts {
    text
    id
    title
  }
}`;

export const createTodoQuery = (args: any)=> {
  return gql`
    mutation {
      createPost(text:"${args.text}",title:"${args.title}"){
        text
        id
        title
      }
    }
  `;
};

export const updateTodoQuery = (args: any)=>gql`
  mutation {
    updatePost(id:"${args.id}",text:"${args.text}",title:"${args.title}"){
		  text
		  id
      title
    }
  }
`;

export const deleteTodoQuery = (todoId: any)=>gql`
  mutation {
    deletePost(id:"${todoId}"){
		  text
		  id
      title
    }
  }
`;
