import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm.jsx';
import ContactList from './ContactList/ContactList.jsx';
import FilterList from './FilterList/FilterList.jsx';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('storyContacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {

    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(
        'storyContacts',
        JSON.stringify(this.state.contacts)
      );
    }
  }

  addContact = ({ name: nameProps, number: numberProps }) => {
    const includsName = this.state.contacts.find(
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

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deletContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <FilterList value={this.state.filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeletContact={this.deletContact}
        />
      </div>
    );
  }
}

export default App;
