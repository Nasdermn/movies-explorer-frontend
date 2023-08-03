import { useState, useEffect } from 'react';
import './SearchForm.css';

function SearchForm({
  onSubmit,
  searchQuery,
  setSearchQuery,
  shortFilmChecked,
  setShortFilmChecked,
}) {
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  useEffect(() => {
    setIsInputEmpty(false);
  }, [shortFilmChecked]);

  function handleInputChange(evt) {
    setSearchQuery(evt.target.value);
    setIsInputEmpty(false);
  }

  function handleCheckboxChange(evt) {
    setShortFilmChecked(evt.target.checked);
  }

  function handleSubmit(evt) {
    const isTextWritten = evt.target.elements['search-movies'].value.trim();
    evt.preventDefault();
    if (!isTextWritten) {
      setIsInputEmpty(true);
    } else {
      onSubmit();
    }
  }

  return (
    <form className='search-form' onSubmit={handleSubmit}>
      <label className='search-form__label search-form__label_type_input'>
        <input
          className='search-form__input'
          type='text'
          name='search-movies'
          placeholder='Фильм'
          onChange={handleInputChange}
          value={searchQuery}
        />
        <button type='submit' className='search-form__button'></button>
      </label>
      <label className='search-form__label search-form__label_type_checkbox'>
        <input
          className='search-form__checkbox'
          type='checkbox'
          name='shortfilm-toggle'
          id='shortfilm-toggle'
          maxLength={50}
          checked={shortFilmChecked}
          onChange={handleCheckboxChange}
        />
        <p className='search-form__text'>Короткометражки</p>
      </label>
      {isInputEmpty && (
        <span className='search-form__error'>Введите текст для поиска</span>
      )}
    </form>
  );
}

export default SearchForm;
