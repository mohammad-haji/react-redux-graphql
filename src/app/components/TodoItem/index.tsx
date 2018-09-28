import * as React from 'react';
import * as classNames from 'classnames';
import * as style from './style.css';
import {TodoModel} from 'app/models';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export namespace TodoItem {
  export interface Props {
    todo: TodoModel;
    onUpdate: any;
    onDelete: any;
  }

  export interface State {
    editing: boolean;
    startDate: any;
    todo: any;
  }
}

export class TodoItem extends React.Component<TodoItem.Props, TodoItem.State> {
  constructor(props: TodoItem.Props, context?: any) {
    super(props, context);
    this.state = {editing: false, startDate: moment(), todo: {}};
    this.handleChange = this.handleChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onComplete = this.onComplete.bind(this);
  }

  componentDidMount() {
    this.setState({todo: this.props.todo});
  }

  handleDoubleClick(todo: any) {
    if (!todo.completed) {
      this.setState({editing: true});
    }
  }

  handleChange(date: any) {
    this.setState({
      startDate: date
    });
  }

  handleSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.which === 13) {
      this.props.onUpdate(this.state.todo);
      this.setState({editing: false});
    }
  }

  handleDescChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.state.todo.text = event.target.value.trim();
    this.setState({todo: this.state.todo})
  }

  onComplete(todo:any) {
    todo.completed = !todo.completed;
    this.props.onUpdate(todo);
    this.setState({todo: todo})
  }


  render() {
    const {todo, onDelete} = this.props;
    // TODO: compose
    const classes = classNames({
      [style.completed]: todo.completed,
      [style.editing]: this.state.editing,
      [style.normal]: !this.state.editing
    });

    return (
      <tr className={classes}>
        <td>
          <input
            className={style.toggle}
            type="checkbox"
            checked={todo.completed}
            onChange={() =>
              todo.id && this.onComplete(todo)
            }
          />
        </td>
        <td>
          {
            this.state.editing ? (
              <input
                style={{
                  padding: '10px',
                  border: '1px solid #eee',
                  marginLeft: '57px'
                }}
                type="text"
                autoFocus
                value={this.state.todo.text}
                onChange={this.handleDescChange}
                onKeyDown={this.handleSubmit}
              />
            ) : (
              <label onDoubleClick={() => this.handleDoubleClick(todo)}>{todo.text}</label>
            )
          }
        </td>
        <td>
          <DatePicker
            selected={this.state.startDate}
            disabled={todo.completed}
            onChange={this.handleChange}
          />
        </td>
        <td>
          <select disabled={todo.completed}>
            <option value="">High</option>
            <option value="">Medium</option>
            <option value="">Low</option>
          </select>
        </td>
        <td>
          <button
            className={style.destroy}
            onClick={() => {
              if (todo.id) onDelete(todo.id);
            }}
          />
        </td>
      </tr>
    );
  }
}
