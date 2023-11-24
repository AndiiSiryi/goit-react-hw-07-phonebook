import css from './ContactList.module.css';
import React from 'react';
import { deleteContactAction } from 'redux/contacts/contacts-slice';
import { useDispatch } from 'react-redux';

const ContactItem = ({ name, number, contactId }) => {
  const dispatch = useDispatch();

  const deleteContact = contactId => dispatch(deleteContactAction(contactId));
  return (
    <li key={contactId} className={css.item}>
      {name}: {number}
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
