export interface IThunkParams {
  readonly dispatch: any;
  readonly getState: any;
}

const thunk = (thunkParams: IThunkParams) => (next: any) => (action: any) => {
  const { dispatch, getState } = thunkParams;

  if (typeof action === "function") {
    return action(dispatch, getState);
  }
  return next(action);
};

export default thunk;
