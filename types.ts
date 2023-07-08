export type Store<A extends StoreActions, S extends StoreState> = {
    readonly connect: StoreConnector<S>
    readonly disconnect: StoreConnector<S>
    readonly getActions: StoreActionsProvider<A>
    readonly getState: StoreStateProvider<S>
}

export type StoreActions = {
    readonly [key: string]: (...args: never[]) => void
}

export type StoreActionsFactory<A extends StoreActions, S extends StoreState> = (input: StoreActionsInput<A, S>) => A

export type StoreActionsInput<A extends StoreActions, S extends StoreState> = {
    readonly getActions: StoreActionsProvider<A>
    readonly getState: StoreStateProvider<S>
    readonly updateState: StoreStateUpdater<S>
}

export type StoreActionsProvider<A extends StoreActions> = () => A

export type StoreConnector<S extends StoreState> = (receiver: StoreStateReceiver<S>) => void

export type StoreState = {
    readonly [key: string]: unknown
}

export type StoreStateFactory<S extends StoreState> = () => S

export type StoreStateProvider<S extends StoreState> = () => S

export type StoreStateReceiver<S extends StoreState> = (state: S) => void

export type StoreStateSelector<S extends StoreState, T> = (state: S) => T

export type StoreStateUpdater<S extends StoreState> = (state: Partial<S>) => void
