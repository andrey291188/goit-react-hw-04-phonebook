import { useEffect, useMemo, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm.jsx';
import ContactList from './ContactList/ContactList.jsx';
import FilterList from './FilterList/FilterList.jsx';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);


  useEffect(() => {
    const localeContacts = localStorage.getItem('localeContacts');
    if (localeContacts) {
      return setContacts(JSON.parse(localeContacts));
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; 
    }
    localStorage.setItem('localeContacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name: nameProps, number: numberProps }) => {

    const includsName = contacts.find(
      ({ name, number }) =>
        name.toLowerCase() === nameProps.toLowerCase() || number === numberProps
    );

    if (includsName) {
      alert(`Name ${nameProps}, phone ${numberProps} is already in contacts`);
      return;
    }
    const contact = {
      id: nanoid(),
      name: nameProps,
      number: numberProps,
    };

    setContacts(prevContacts => {
      return [...prevContacts, contact];
    });
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = useMemo(() => {
   
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }, [contacts, filter])

  const deletContact = contactId => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !== contactId);
    });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmitForm={addContact} />
      <h2>Contacts</h2>
      <FilterList value={filter} onChange={changeFilter} />
      <ContactList contacts={getVisibleContacts} onDeletContact={deletContact} />
    </div>
  );
};

export default App;
