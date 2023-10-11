// this slice is in charge of controlling and updating the property portfolio state
import { createSlice } from '@reduxjs/toolkit';
import data from '../../server/data';

// the 'createSlice()' function will return some information and assign it to the 'propertySlice' variable
const propertySlice = createSlice({
  name: 'property',
  initialState: data,
  // the 'reducer' responds to the action and it takes the 'initialState' and creates a new state based on the action 'payload'
  reducers: {
    // the 'state' is the 'initialState' of the slice => the content will be whatever is in the 'initialState' property
    // the 'action' contains the 'type' and the 'payload' - these come from the component
    addProperty: (state, action) => {
      console.log('added property');

      const newProperty = action.payload;
      state.push(newProperty);
    },
    deleteProperty: (state, action) => {
      console.log('deleted property');

      return state.filter((property) => property.id !== action.payload.id);
    },
    updateProperty: (state, action) => {
      console.log('updated property');

      // finds the index of the object that needs updating in the global state
      const index = state.findIndex(
        (element) => element.id === action.payload.id
      );
      console.log(index);

      state.splice(index, 1, action.payload);
    },
    updateNotes: (state, action) => {
      console.log('notes have been updated');

      const { id, notes } = action.payload;

      const propertyToUpdate = state.find((property) => property.id === id);
      if (propertyToUpdate) {
        propertyToUpdate.notes = notes;
      }

      return state;
    },
  },
});

// exporting the reducer 'addProperty' so the components can dispatch the available reducer actions
export const { addProperty, deleteProperty, updateProperty, updateNotes } =
  propertySlice.actions;

// exporting the reducer so it can be added to the 'store.js'
export default propertySlice.reducer;
