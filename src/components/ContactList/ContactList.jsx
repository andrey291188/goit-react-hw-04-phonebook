import css from './contactlist.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onDeletContact }) => {
  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={css.item}>
          <p className={css.name}>{name}:</p>
          <p className={css.phone}>{number}</p>
          <button
            onClick={() => onDeletContact(id)}
            className={css.button_delet}
          >
            Delet
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeletContact: PropTypes.func.isRequired,
};
