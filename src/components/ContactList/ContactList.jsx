import css from './ContactList.module.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from 'redux/filter/filter-selector';
import ContactItem from './ContactItem';

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, phone }) => {
        return (
          <ContactItem key={id} name={name} phone={phone} contactId={id} />
        );
      })}
    </ul>
  );
};
export default ContactList;
