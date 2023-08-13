import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import css from './contactform.module.css';

const ContactForm = ({ onSubmitForm }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
    onSubmit: values => {
      onSubmitForm(values);
      formik.resetForm();
    },
  });

  return (
    <form className={css.form_style} onSubmit={formik.handleSubmit}>
      <label htmlFor="name">
        <p className={css.nameInput}>Enter your Name</p>
        <input
          type="text"
          name="name"
          pattern="[a-zA-Zа-яА-ЯіІїЇ]+"
          title="Name may contain only letters"
          required
          onChange={formik.handleChange}
          value={formik.values.name}
          className={css.form_input}
        />
      </label>
      <label htmlFor="number">
        <p className={css.nameInput}>Enter your Phone</p>
        <input
          type="text"
          name="number"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
          title="Phone number must xxx-xxx-xx-xx"
          required
          onChange={formik.handleChange}
          value={formik.values.number}
          className={css.form_input}
        />
      </label>
      <button type="submit" className={css.button_create}>
        Add contacts
      </button>
    </form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
