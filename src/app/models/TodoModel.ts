export interface TodoModel {
  id: number;
  text: string;
  completed: boolean;
}

export namespace TodoModel {
  export enum Filter {
    SHOW_ALL = 'name',
    SHOW_ACTIVE = 'date',
    SHOW_COMPLETED = 'priority'
  }
}
