import css from './ContactList.module.css';
import React from 'react';
// import { deleteContactAction } from 'redux/contacts/contacts-slice';
import { useDispatch } from 'react-redux';
import { deleteContactsThunk } from 'redux/contacts/contacts-thunk';

const ContactItem = ({ name, phone, contactId }) => {
  const dispatch = useDispatch();

  const deleteContact = contactId => dispatch(deleteContactsThunk(contactId));
  return (
    <li key={contactId} className={css.item}>
      {name}: {phone}
      <button
        className={css.buttonDelet}
        type="button"
        onClick={() => deleteContact(contactId)}
      >
        Delete
      </button>
    </li>
  );
};

export default ContactItem;
