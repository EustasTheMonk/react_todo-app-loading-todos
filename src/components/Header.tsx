import cn from 'classnames';
import React from 'react';

interface Props {
  areAllTodoCompleted: boolean;
  todosLength: number;
}

export const Header: React.FC<Props> = ({
  todosLength,
  areAllTodoCompleted,
}) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todosLength > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: areAllTodoCompleted,
          })}
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
