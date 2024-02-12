import { useState } from 'react';
import FileInput from './FileInput';
import RatingInput from './RatingInput';
import { createReview } from '../api';
import useAsync from '../hooks/useAsync';
import useTranslate from '../hooks/useTranslate';
const INITIAL_VALUE = { title: '', rating: 0, content: '', imgFile: null };

function ReviewForm({
  initialValues = INITIAL_VALUE,
  onSubmitSuccess,
  onCancel,
  imgPreview,
  onSubmit,
}) {
  const [values, setValues] = useState(initialValues);
  const t = useTranslate();
  const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit);
  const handleChange = (name, value) => {
    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('rating', values.rating);
    formData.append('content', values.content);
    formData.append('imgFile', values.imgFile);
    let result = await onSubmitAsync(formData);
    if (!result) return;
    const { review } = result;

    setValues(INITIAL_VALUE);
    onSubmitSuccess(review);
  };
  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
        imgPreview={imgPreview}
      ></FileInput>
      <input name="title" value={values.title} onChange={handleInputChange} />
      <RatingInput
        name="rating"
        value={values.rating}
        onChange={handleChange}
      />
      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      ></textarea>
      <button type="submit" disabled={isSubmitting}>
        {t('confirm button')}
      </button>
      {onCancel && <button onClick={onCancel}>{t('cancel button')}</button>}
    </form>
  );
}

export default ReviewForm;
