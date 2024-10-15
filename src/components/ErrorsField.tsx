import React from 'react';
import cn from 'classnames';
import { Errors } from '../utils/Errors';

interface Props {
  showErrorMessage: boolean;
  setShowErrorMessage: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: Errors;
}

export const ErrorsField: React.FC<Props> = ({
  showErrorMessage,
  setShowErrorMessage,
  errorMessage,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !showErrorMessage,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setShowErrorMessage(false)}
      />
      {errorMessage}
    </div>
  );
};
