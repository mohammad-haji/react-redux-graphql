import * as React from 'react';
import * as style from './style.css';
import * as classNames from 'classnames';
import { TodoModel } from 'app/models';

export const FILTER_TITLES = {
  [TodoModel.Filter.SHOW_ALL]: 'Name',
  [TodoModel.Filter.SHOW_ACTIVE]: 'Due Date',
  [TodoModel.Filter.SHOW_COMPLETED]: 'Priority'
};

export namespace Filters {
  export interface Props {
    filter: TodoModel.Filter;
    completedCount?: number;
    onClickFilter: (filter: TodoModel.Filter) => any;
    onClickClearCompleted: () => any;
  }
}

export class Filters extends React.Component<Filters.Props> {
  static defaultProps: Partial<Filters.Props> = {
    completedCount: 0
  };

  renderFilterLink(filter: TodoModel.Filter): JSX.Element {
    const { filter: selectedFilter, onClickFilter } = this.props;

    return (
      <a
        className={classNames({ [style.selected]: filter === selectedFilter })}
        style={{ cursor: 'pointer' }}
        onClick={() => onClickFilter(filter)}
        children={FILTER_TITLES[filter]}
      />
    );
  }

  render() {
    return (
      <div className={style.normal}>
        <ul className={style.filters}>
          <li style={{marginRight: '1%'}}>
            Sort By
          </li>
          {(Object.keys(TodoModel.Filter) as (keyof typeof TodoModel.Filter)[]).map((key) => (
            <li key={key} children={this.renderFilterLink(TodoModel.Filter[key])} />
          ))}
        </ul>
      </div>
    );
  }
}
