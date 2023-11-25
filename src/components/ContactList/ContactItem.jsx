import { Loader } from 'components/Loader/Loader';
import css from './ContactList.module.css';
import React, { useState } from 'react';
// import { deleteContactAction } from 'redux/contacts/contacts-slice';
import { useDispatch } from 'react-redux';
import { deleteContactsThunk } from 'redux/contacts/contacts-thunk';

const ContactItem = ({ name, phone, contactId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const deleteContact = async contactId => {
    try {
      setLoading(true);
      await dispatch(deleteContactsThunk(contactId));
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <li key={contactId} className={css.item}>
      {name}: {phone}
      <button
        className={css.buttonDelet}
        type="button"
        onClick={() => deleteContact(contactId)}
      >
        {loading ? <Loader /> : 'Delete'}
      </button>
    </li>
  );
};

export default ContactItem;
