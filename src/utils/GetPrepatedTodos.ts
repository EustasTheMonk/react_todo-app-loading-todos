import { Todo } from '../types/Todo';
import { FilterTypes } from '../types/FilterTypes';

export const getPreparedTodos = (
  todos: Todo[],
  filterInstructions: string,
): Todo[] => {
  return todos.filter(todo => {
    switch (filterInstructions) {
      case FilterTypes.All:
        return true;
      case FilterTypes.Active:
        return todo.completed === false;
      case FilterTypes.Completed:
        return todo.completed === true;
      default:
        return true;
    }
  });
};
