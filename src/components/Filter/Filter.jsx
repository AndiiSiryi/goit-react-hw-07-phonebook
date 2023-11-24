import React from 'react';
import { nanoid } from 'nanoid';
import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'redux/filter/filter-selector';
import { filterContactAction } from 'redux/filter/filter-slice';

const Filter = () => {
  const filterValue = useSelector(selectFilter);
  const dispatch = useDispatch();
  const filterInputId = nanoid(4);
  return (
    <label htmlFor={filterInputId} className={css.label}>
      Find contacts by name:
      <input
        className={css.input}
        type="text"
        name="filter"
        id={filterInputId}
        value={filterValue}
        onChange={e => dispatch(filterContactAction(e.target.value))}
      />
    </label>
  );
};

export default Filter;
