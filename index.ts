import type {
    Store,
    StoreActions,
    StoreActionsFactory,
    StoreActionsProvider,
    StoreConnector,
    StoreState,
    StoreStateFactory,
    StoreStateProvider,
    StoreStateReceiver,
    StoreStateUpdater
} from './types'

/** */
export const createStore = <A extends StoreActions, S extends StoreState>(
    createActions: StoreActionsFactory<A, S>,
    createState: StoreStateFactory<S>
): Store<A, S> => {
    let currentActions: A | undefined
    let currentState: S | undefined

    const stateReceivers = new Set<StoreStateReceiver<S>>()

    const connect: StoreConnector<S> = (receiver) => {
        stateReceivers.add(receiver)

        if (currentState !== undefined) {
            receiver(currentState)
        }
    }

    const disconnect: StoreConnector<S> = (receiver) => {
        stateReceivers.delete(receiver)
    }

    const getActions: StoreActionsProvider<A> = () => {
        if (currentActions === undefined) {
            currentActions = createActions({
                getActions,
                getState,
                updateState
            })
        }

        return currentActions
    }

    const getState: StoreStateProvider<S> = () => {
        if (currentState === undefined) {
            currentState = createState()
        }

        return currentState
    }

    const updateState: StoreStateUpdater<S> = (changes) => {
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
