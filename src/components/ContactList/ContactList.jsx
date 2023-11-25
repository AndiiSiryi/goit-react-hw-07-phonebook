import css from './ContactList.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredContacts } from 'redux/filter/filter-selector';
import ContactItem from './ContactItem';
import { getContactsThunk } from 'redux/contacts/contacts-thunk';
import { Loader } from 'components/Loader/Loader';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        await dispatch(getContactsThunk());
      } catch (error) {
        alert(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader className={css.loader} />
      ) : (
        <ul className={css.list}>
          {contacts.map(({ id, name, phone }) => {
            return (
              <ContactItem key={id} name={name} phone={phone} contactId={id} />
            );
          })}
        </ul>
      )}
    </>
  );
};
export default ContactList;
