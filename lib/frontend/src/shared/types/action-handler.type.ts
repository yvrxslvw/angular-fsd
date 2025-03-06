export type ActionHandler<S, P = {}> = (state: S, payload: P) => S;
