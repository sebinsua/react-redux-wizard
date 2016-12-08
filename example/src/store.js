import { createStore, combineReducers } from 'redux'
import { reducer as wizards } from 'react-redux-wizard'

export default createStore(
  combineReducers({ wizards }),
  {},
  window.devToolsExtension ? window.devToolsExtension() : f => f
)
