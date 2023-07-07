export type Reactive<A extends ReactiveActions, S extends ReactiveState> = {
    readonly connect: ReactiveConnector<S>
    readonly disconnect: ReactiveConnector<S>
    readonly getActions: ReactiveActionsProvider<A>
    readonly getState: ReactiveStateProvider<S>
}

export type ReactiveActions = {
    readonly [key: string]: (...args: never[]) => void
}

export type ReactiveActionsFactory<A extends ReactiveActions, S extends ReactiveState> = (
    input: ReactiveActionsInput<A, S>
) => A

export type ReactiveActionsInput<A extends ReactiveActions, S extends ReactiveState> = {
    readonly getActions: ReactiveActionsProvider<A>
    readonly getState: ReactiveStateProvider<S>
    readonly updateState: ReactiveStateUpdater<S>
}

export type ReactiveActionsProvider<A extends ReactiveActions> = () => A

export type ReactiveConnector<S extends ReactiveState> = (receiver: ReactiveStateReceiver<S>) => void

export type ReactiveState = {
    readonly [key: string]: unknown
}

export type ReactiveStateFactory<S extends ReactiveState> = () => S

export type ReactiveStateProvider<S extends ReactiveState> = () => S

export type ReactiveStateReceiver<S extends ReactiveState> = (state: S) => void

export type ReactiveStateSelector<S extends ReactiveState, T> = (state: S) => T

export type ReactiveStateUpdater<S extends ReactiveState> = (state: Partial<S>) => void
