import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import css from './contactform.module.css';


const ContactForm = ({onSubmitForm}) => {

  const handleSubmit = (values, {resetForm}) => {
    onSubmitForm(values);
    resetForm()
  };

    const schema = yup.object().shape({
      name: yup.string().min(2).required(),
      number: yup.number().min(6).required(),
    })
    
    return (
      <Formik initialValues={{name: "", number: ""}} validationSchema={schema} onSubmit={handleSubmit}>
        <Form className={css.form_style}>
          <label htmlFor="name">
          <p className={css.nameInput}>Enter your Name</p>
            <Field
              type="text"
              name="name"
              className={css.form_input}
            />
            <ErrorMessage name='name' component="div"/>
          </label>
          <label htmlFor="number">
          <p className={css.nameInput}>Enter your Phone</p>
            <Field
              type="text"
              name="number"
              className={css.form_input}
            />
            <ErrorMessage name='number' component="div"/>
          </label>
          <button type="submit" className={css.button_create}>
            Add contacts
          </button>
        </Form>
      </Formik>
    );
  }

export default ContactForm;

ContactForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
}

