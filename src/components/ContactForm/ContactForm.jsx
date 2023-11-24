import { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/contacts/contacts-selector';
import { addContactAction } from 'redux/contacts/contacts-slice';

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const validateName = name => {
    const nameRegex = /^[a-zA-Zа-яА-ЯїіІ'Ї\s]+$/;
    return nameRegex.test(name);
  };

  const validateNumber = number => {
    const phoneRegex = /^\d{7}$|^\d{3}-\d{2}-\d{2}$/;
    return phoneRegex.test(number);
  };

  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const contacts = useSelector(selectContacts);

  const handleSubmit = e => {
    e.preventDefault();

    if (!validateName(name)) {
      return alert('Name may contain only letters, apostrophe, and spaces');
    }

    if (!validateNumber(number)) {
      return alert(
        'The phone number must contain only 7 digits, example: XXXXXXX or XXX-XX-XX.'
      );
    }

    const newContact = {
      id: nanoid(4),
      name: name,
      number: number,
    };

    if (
      contacts.some(
        contact =>
          contact.name.toLowerCase().trim() === name.toLowerCase().trim()
      )
    ) {
      return alert(`${name} is already in contacts`);
    }
    dispatch(addContactAction(newContact));
    setName('');
    setNumber('');
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
          name="number"
          value={number}
          onChange={handleChange}
          required
        />
      </label>
      <button className={css.button} type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
