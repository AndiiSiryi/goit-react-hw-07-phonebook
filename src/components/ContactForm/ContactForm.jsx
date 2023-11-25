import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/contacts/contacts-selector';
// import { addContactAction } from 'redux/contacts/contacts-slice';
import {
  addContactsThunk,
  getContactsThunk,
} from 'redux/contacts/contacts-thunk';
import { Loader } from 'components/Loader/Loader';
import { Notify } from 'notiflix';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const validateName = name => {
    const nameRegex = /^[a-zA-Zа-яА-ЯїіІ'Ї\s]+$/;
    return nameRegex.test(name);
  };

  const validateNumber = phone => {
    // const phoneRegex = /^\d{7}$|^\d{3}-\d{2}-\d{2}$/;
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'phone') {
      setPhone(value);
    }
  };

  const contacts = useSelector(selectContacts);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateName(name)) {
      Notify.failure('Name may contain only letters, apostrophe, and spaces');
      return;
    }

    if (!validateNumber(phone)) {
      Notify.failure(
        'The phone number must contain only 10 digits, example: XXX-XXX-XXXX.'
      );
      return;
    }

    const newContact = {
      id: nanoid(4),
      name: name,
      phone: phone,
    };

    if (
      contacts.some(
        contact =>
          contact.name.toLowerCase().trim() === name.toLowerCase().trim()
      )
    ) {
      Notify.failure(`${name} is already in contacts`);
      return;
    }
    try {
      setLoading(true);
      await dispatch(addContactsThunk(newContact));
      setName('');
      setPhone('');
      Notify.success(`Contact "${newContact.name}"  added successfully`);
    } catch (error) {
      Notify.error(
        `Contact "${newContact.name}" not added.  Error: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
    // dispatch(addContactsThunk(newContact));
    // setName('');
    // setPhone('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Name:
        <input
          className={css.input}
          id="nameInput"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </label>
      <label className={css.label}>
        Phone Number:
        <input
          className={css.input}
          id="numberInput"
          type="tel"
          name="phone"
          value={phone}
          onChange={handleChange}
          required
        />
      </label>
      <button className={css.button} type="submit">
        {loading ? <Loader /> : 'Add Contact'}
      </button>
    </form>
  );
};

export default ContactForm;
