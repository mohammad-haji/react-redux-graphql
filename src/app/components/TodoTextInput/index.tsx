import * as React from 'react';
import * as classNames from 'classnames';
import * as style from './style.css';

export namespace TodoTextInput {
  export interface Props {
    text?: string;
    placeholder?: string;
    newTodo?: boolean;
    editing?: boolean;
    onSave: (todo: any) => void;
  }

  export interface State {
    text: string;
    title: string;
    name: string;
    id: string;
    date: string;
    priority: string;
  }
}

export class TodoTextInput extends React.Component<TodoTextInput.Props, TodoTextInput.State> {
  constructor(props: TodoTextInput.Props, context?: any) {
    super(props, context);
    this.state = {
      text: this.props.text || '',
      title: 'mmm',
      name: '',
      date: '',
      priority: 'high',
      id: ''
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.which === 13) {
      this.props.onSave(this.state);
      if (this.props.newTodo) {
        this.setState({text: ''});
      }
    }
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({text: event.target.value});
  }

  handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const text = event.target.value.trim();
    this.setState({text});
    if (!this.props.newTodo) {
      this.props.onSave(this.state);
    }
  }

  render() {
    const classes = classNames(
      {
        [style.edit]: this.props.editing,
        [style.new]: this.props.newTodo
      },
      style.normal
    );

    return (
      <input
        className={classes}
        type="text"
        autoFocus
        placeholder={this.props.placeholder}
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    );
  }
}
