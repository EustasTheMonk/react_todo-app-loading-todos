/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { FilterTypes } from './types/FilterTypes';
import { getPreparedTodos } from './utils/GetPrepatedTodos';
import { getAmountOfActiveTodos } from './utils/getAmountOfActiveTodos';
import { Footer } from './components/Footer';
import { Errors } from './utils/Errors';
import { ErrorsField } from './components/ErrorsField';
import { Header } from './components/Header';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterInstructions, setFilterInstructions] = useState<FilterTypes>(
    FilterTypes.All,
  );
  const [errorMessage, setErrorMessage] = useState<Errors>(Errors.Default);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(Errors.Loading);
        setShowErrorMessage(true);
        setTimeout(() => setShowErrorMessage(false), 3000);
      });
  }, []);

  const unfinishedTodoAmount = useMemo(
    () => getAmountOfActiveTodos(todos),
    [todos],
  );

  const areAllTodoCompleted = unfinishedTodoAmount === 0;

  if (!USER_ID) {
    return <UserWarning />;
  }

  const preparedTodos = getPreparedTodos(todos, filterInstructions);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          areAllTodoCompleted={areAllTodoCompleted}
          todosLength={todos.length}
        />
        <TodoList todos={preparedTodos} />
        {todos.length > 0 && (
          <Footer
            unfinishedTodoAmount={unfinishedTodoAmount}
            filterInstructions={filterInstructions}
            setFilterInstructions={setFilterInstructions}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorsField
        showErrorMessage={showErrorMessage}
        setShowErrorMessage={setShowErrorMessage}
        errorMessage={errorMessage}
      />
    </div>
  );
};
