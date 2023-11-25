import { createAsyncThunk } from '@reduxjs/toolkit';
import { addContacts, deleteContacts, getContacts } from 'services/contactsAPI';

export const getContactsThunk = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getContacts();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContactsThunk = createAsyncThunk(
  'contacts/addContact',
  async (newContact, { rejectWithValue }) => {
    try {
      const data = await addContacts(newContact);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContactsThunk = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      const data = await deleteContacts(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
