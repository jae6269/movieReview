import ReviewList from './ReviewList';
import { useEffect, useState } from 'react';
import { createReview, deleteReview, getReviews, updateReview } from '../api';
import ReviewForm from './ReviewForm';
import useAsync from '../hooks/useAsync';
import LocaleContext, { LocaleProvider } from '../contexts/LocaleContext';
import LocaleSelect from './LocaleSelect';
const LIMIT = 6;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState('createdAt');
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  const [isLoad, loadingError, getReviewsAsync] = useAsync(getReviews);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder('createdAt');
  const handleBestClick = () => setOrder('rating');

  const handleDelelte = async (id) => {
    const result = await deleteReview(id);
    if (!result) return;
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleLoadClick = async (options) => {
    let result = await getReviewsAsync(options);
    if (!result) return;

    const { reviews, paging } = result;
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]);
    }
    setOffset(options.offset + reviews.length);
    setHasNext(paging.hasNext);
  };

  const handleLoadMore = () => {
    handleLoadClick({ order, offset, limit: LIMIT });
  };

  const handleCreateSuccess = (review) => {
    setItems((prevItems) => [review, ...prevItems]);
  };
  const handleUpdateSuccess = (review) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === review.id);
      return [
        ...prevItems.slice(0, splitIdx),
        review,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  useEffect(() => {
    handleLoadClick({ order, offset: 0, LIMIT });
  }, [order]);

  return (
    <LocaleProvider defaultvalue={'ko'}>
      <div>
        <LocaleSelect />
        <div>
          <button onClick={handleBestClick}>평점순</button>
          <button onClick={handleNewestClick}>최신순</button>
        </div>
        {hasNext && (
          <button disabled={isLoad} onClick={handleLoadMore}>
            더보기
          </button>
        )}
        <ReviewForm
          onSubmit={createReview}
          onSubmitSuccess={handleCreateSuccess}
        ></ReviewForm>
        <ReviewList
          items={sortedItems}
          onDelete={handleDelelte}
          onUpdate={updateReview}
          onUpdateSuccess={handleUpdateSuccess}
        ></ReviewList>
      </div>
    </LocaleProvider>
  );
}

export default App;
