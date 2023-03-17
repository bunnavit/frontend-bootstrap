import { Dispatch, SetStateAction } from 'react';
import { isForbiddenError } from '../util/error';

export const onRequestError = (
  setIsAuthed: Dispatch<SetStateAction<boolean>>,
  error: unknown
) => {
  if (isForbiddenError(error)) setIsAuthed(false);
};
