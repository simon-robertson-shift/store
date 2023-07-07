import type {
    Reactive,
    ReactiveActions,
    ReactiveActionsFactory,
    ReactiveActionsProvider,
    ReactiveConnector,
    ReactiveState,
    ReactiveStateFactory,
    ReactiveStateProvider,
    ReactiveStateReceiver,
    ReactiveStateUpdater
} from './types'

/** */
export const createReactiveStore = <A extends ReactiveActions, S extends ReactiveState>(
    createActions: ReactiveActionsFactory<A, S>,
    createState: ReactiveStateFactory<S>
): Reactive<A, S> => {
    let currentActions: A | undefined
    let currentState: S | undefined

    const stateReceivers = new Set<ReactiveStateReceiver<S>>()

    const connect: ReactiveConnector<S> = (receiver) => {
        stateReceivers.add(receiver)

        if (currentState !== undefined) {
            receiver(currentState)
        }
    }

    const disconnect: ReactiveConnector<S> = (receiver) => {
        stateReceivers.delete(receiver)
    }

    const getActions: ReactiveActionsProvider<A> = () => {
        if (currentActions === undefined) {
            currentActions = createActions({
                getActions,
                getState,
                updateState
            })
        }

        return currentActions
    }

    const getState: ReactiveStateProvider<S> = () => {
        if (currentState === undefined) {
            currentState = createState()
        }

        return currentState
    }

    const updateState: ReactiveStateUpdater<S> = (changes) => {
        const current = getState()

        currentState = {
            ...current,
            ...changes
        }

        notifyStateReceivers(currentState)
    }

    const notifyStateReceivers = (state: S): void => {
        for (const receiver of stateReceivers) {
            if (state === currentState) {
                receiver(state)
                continue
            }

            break
        }
    }

    return {
        connect,
        disconnect,
        getActions,
        getState
    }
}
