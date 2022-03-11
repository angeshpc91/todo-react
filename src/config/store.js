import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import logger from 'redux-logger'

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const initialState = {}

export default function configureStore() {
  const middleware = [thunk.withExtraArgument(), logger]

  return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(
    ...middleware
  )))
}
