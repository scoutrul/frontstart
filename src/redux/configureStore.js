import { createStore, compose } from 'redux'
import rootReducer from './reducers'

const isClient = process.browser;
const composeEnhancers = isClient ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers()
  )
}


