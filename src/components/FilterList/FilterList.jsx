import css from "./filterlist.module.css"
import PropTypes from 'prop-types';

const FilterList = ({value, onChange}) => {
  return (
    <label className={css.form_style}>
      <h2>Find contacts by name</h2>
      <input type="text" className={css.form_input} value={value} onChange={onChange}/>
    </label>
  );
};

export default FilterList

FilterList.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}