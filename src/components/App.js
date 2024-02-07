import ReviewList from './ReviewList';
import { useEffect, useState } from 'react';
import { getReviews } from '../api';
const LIMIT = 6;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState('createdAt');
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder('createdAt');
  const handleBestClick = () => setOrder('rating');

  const handleDelelte = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoadClick = async (options) => {
    const { reviews, paging } = await getReviews(options);
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems([...items, ...reviews]);
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
      <ReviewList items={sortedItems} onDelete={handleDelelte}></ReviewList>
      <button disabled={!hasNext} onClick={handleLoadMore}>
        더보기
      </button>
    </div>
  );
}

export default App;
