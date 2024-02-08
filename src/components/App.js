import ReviewList from './ReviewList';
import { useEffect, useState } from 'react';
import { getReviews } from '../api';
import ReviewForm from './ReviewForm';
const LIMIT = 6;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState('createdAt');
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder('createdAt');
  const handleBestClick = () => setOrder('rating');

  const handleDelelte = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoadClick = async (options) => {
    let result;
    try {
      setIsLoad(true);
      result = await getReviews(options);
    } catch (e) {
      console.log(e);
      return;
    } finally {
      setIsLoad(false);
    }
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

  useEffect(() => {
    handleLoadClick({ order, offset: 0, LIMIT });
  }, [order]);

  return (
    <div>
      <div>
        <button onClick={handleBestClick}>평점순</button>
        <button onClick={handleNewestClick}>최신순</button>
      </div>
      {hasNext && (
        <button disabled={isLoad} onClick={handleLoadMore}>
          더보기
        </button>
      )}
      <ReviewForm></ReviewForm>
      <ReviewList items={sortedItems} onDelete={handleDelelte}></ReviewList>
    </div>
  );
}

export default App;
