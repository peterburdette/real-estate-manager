// the 'configureStore' function creates a store which holds the state and reducers
import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from '../app/reducers/propertySlice';

// exporting 'configureStore()' allows the linking of the store to the app
export default configureStore({
  reducer: {
    // registering the 'propertyReducer' from 'propertySlice' with the redux store
    properties: propertyReducer,
  },
});
