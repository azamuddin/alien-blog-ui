import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {Post, User} from './types'
import uniqBy from 'lodash/uniqBy'

export type AppStore = {
  user: User | null, 
  token: string | null, 
  posts: Post[]
}

export type ActionStore = {
  type: string, 
  payload?: any
}

const initialState: AppStore = {
  user: null, 
  token: null, 
  posts: [], 
}

const reducer = (state = initialState, action: ActionStore) => {
  switch (action.type) {

    case "ACCEPT_USER":
      return {...state, user: action.payload}

    case "POST_LOADED":
      return {...state, posts: action.payload}

    case "APPEND_POSTS": 
      return {...state, posts: uniqBy([...state.posts, ...action.payload], 'id')}

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

let store: any;

export const initializeStore = (preloadedState?: AppStore) => {
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

export function useStore(initialState: AppStore) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
