import * as React from 'react';
import {TodoTextInput} from '../TodoTextInput';

export namespace AddTodo {
  export interface Props {
    addTodo: (todo: any) => any;
  }
}

export class AddTodo extends React.Component<AddTodo.Props> {
  constructor(props: AddTodo.Props, context?: any) {
    super(props, context);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(todo: any) {
    if (todo.text.length) {
      this.props.addTodo({...todo});
    }
  }

  render() {
    return (
      <div style={{marginBottom: '10%'}}>
        <TodoTextInput newTodo onSave={this.handleSave} placeholder="Enter task description..."/>
      </div>
    );
  }
}
