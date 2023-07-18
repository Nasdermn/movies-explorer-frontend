function SearchForm() {
  return (
    <form className='search-form'>
      <label className='search-form__label search-form__label_type_input'>
        <input
          className='search-form__input'
          type='text'
          name='search-movies'
          placeholder='Фильм'
        />
        <button type='submit' className='search-form__button'></button>
      </label>
      <label className='search-form__label search-form__label_type_checkbox'>
        <input
          className='search-form__checkbox'
          type='checkbox'
          name='shortfilm-toggle'
          id='shortfilm-toggle'
        />
        <p className='search-form__text'>Короткометражки</p>
      </label>
    </form>
  );
}

export default SearchForm;
