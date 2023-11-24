import { createSelector } from 'reselect';
import { selectContacts } from 'redux/contacts/contacts-selector';

export const selectFilter = state => state.filter;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) =>
    contacts.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase().trim())
    )
);
