import { useContext, useState } from 'react';
import Rating from './Rating';
import ReviewForm from './ReviewForm';
import LocaleContext, { useLocale } from '../contexts/LocaleContext';
function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function ReviewListItem({ item, onDelete, onEdit }) {
  const locale = useLocale();
  const handleDelelteClick = () => onDelete(item.id);
  const handleEditClick = () => onEdit(item.id);
  return (
    <div className="ReviewListItem">
      <img src={item.imgUrl} alt={item.title} className="ReviewListItem-img" />
      <div>
        <h1>{item.title}</h1>
        <Rating value={item.rating}></Rating>
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>

        <button onClick={handleDelelteClick}>삭제</button>
        <button onClick={handleEditClick}>수정</button>
      </div>
    </div>
  );
}

function ReviewList({ items, onDelete, onUpdate, onUpdateSuccess }) {
  const [editingId, setEditingId] = useState(null);
  const handleCancel = () => setEditingId(null);
  return (
    <ul>
      {items.map((item) => {
        if (item.id == editingId) {
          const { id, imgUrl, title, rating, content } = item;
          const initialValues = { title, rating, content };

          const handleSubmit = (formData) => onUpdate(id, formData);
          const handleSubmitSuccess = (review) => {
            onUpdateSuccess(review);
            setEditingId(null);
          };

          return (
            <li key={item.id}>
              <ReviewForm
                initialValues={initialValues}
                onCancel={handleCancel}
                imgPreview={imgUrl}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
              ></ReviewForm>
            </li>
          );
        }
        return (
          <li key={item.id}>
            <ReviewListItem
              item={item}
              onDelete={onDelete}
              onEdit={setEditingId}
            ></ReviewListItem>
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewList;
