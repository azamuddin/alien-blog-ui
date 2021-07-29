import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
  user: null, 
  token: null, 
  posts: [], 
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {...state, ...action.payload}

    case "LOGOUT":
      return {user: null, token: null}

    case "POST_LOADED":
      return {...state, posts: action.payload}

    case "APPEND_POSTS": 
      return {...state, posts: [...state.posts, ...action.payload]}

    default: 
      return state;
  }
}

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}

let store;

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
