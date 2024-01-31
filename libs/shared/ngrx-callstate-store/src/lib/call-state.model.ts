import { CustomError, ErrorHandler } from './external.model';

export type LoadingState = 'INIT' | 'LOADING' | 'LOADED';

export const UNKNOWN_ERROR_CAUSE = 'UNKNOWN_ERROR';
export const UNKNOWN_ERROR_MESSAGE = 'unknown error occured';

export class CallStateError {
  name: string;
  message: string;
  stack?: string;

  constructor(name = '', message = '') {
    this.name = name;
    this.message = message;
  }
}

export class CallStateErrorHandler implements ErrorHandler<CallStateError> {
  toError = (error: unknown): CallStateError => {
    if (error instanceof CallStateError) return error;
    if (error instanceof Error)
      return new CallStateError(error.name, error.message);
    return new CallStateError(UNKNOWN_ERROR_CAUSE, UNKNOWN_ERROR_MESSAGE);
  };

  getErrorMessage = (error?: CallStateError): string | undefined => {
    return error?.message;
  };
}

export interface ErrorState {
  error: CustomError;
}

export type CallState = LoadingState | ErrorState;

export const getErrorCallState = (
  callState: CallState,
): CustomError | undefined => {
  if (isErrorState(callState)) {
    return callState.error;
  }
  return undefined;
};

export const isLoadedOrInError = (callState: CallState): boolean =>
  callState === 'LOADED' || isErrorState(callState);

export const isErrorState = (callState: CallState): callState is ErrorState =>
  Object.prototype.hasOwnProperty.call(callState, 'error');
