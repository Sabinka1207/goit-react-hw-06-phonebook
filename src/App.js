import { useEffect } from "react";
import Notiflix from "notiflix";
import shortid from "shortid";
import ContactForm from "./Components/ContactForm/ContactForm";
import ContactList from "./Components/ContactList/ContactList";
import Filter from "./Components/Filter/Filter";
import "./App.css";

import { useSelector,useDispatch } from 'react-redux'
import { remove, add, search } from './slices/phoneBookSlice' 

const App = () => {
  const contacts = useSelector(state => state.contacts.value)
  const filter = useSelector(state => state.contacts.filter)
  const dispatch = useDispatch()

  const addContact = (name, number) => {
    const normalizedName = name.toLowerCase();
    const doubledNames = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedName)
    ).length;
    if (!doubledNames) {
      const contact = {
        id: shortid.generate(),
        name: name,
        number: number,
      };
      dispatch(add([contact, ...contacts]))
    } else {
      Notiflix.Report.warning(
        "Warning",
        `${name} is already in contacts`,
        "OK"
      );
    }
  };

  const deleteContact = (contactId) => {
    dispatch(remove(contactId))
  };

  useEffect(() => {
    const contacts = localStorage.getItem("contacts");
    if (contacts) {
      const parcedContacts = JSON.parse(contacts);
      dispatch(add(parcedContacts))
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const changeFilter = (e) => {
    dispatch(search(e.currentTarget.value))
  };

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter onChange={changeFilter} value={filter} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
};

export default App;
