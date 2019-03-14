import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import persistStateSS from 'redux-sessionstorage'

const isServer = typeof window === 'undefined'

function appReducer (state = {}, action) {
  switch (action.type) {
    case 'App:toggleNotice':
      return { showNotice: !state.showNotice }
    default: return state
  }
}

const reducer = combineReducers({
  app: appReducer
})

const defaultInitialState = {
  app: {
    showNotice: false
  }
}

const composed = [!isServer ? persistStateSS(['app']) : undefined]

const enhancer = composeWithDevTools(...composed)
export function initializeStore (initialState = defaultInitialState) {
  return createStore(reducer, initialState, enhancer)
}
