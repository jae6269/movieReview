import ReviewList from './ReviewList';
import { useEffect, useState } from 'react';
import { getReviews } from '../api';
function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState('createdAt');
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder('createdAt');
  const handleBestClick = () => setOrder('rating');

  const handleDelelte = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoadClick = async (orderQuery) => {
    const { reviews } = await getReviews(orderQuery);
    setItems(reviews);
  };

  useEffect(() => {
    handleLoadClick(order);
  }, [order]);

  return (
    <div>
      <div>
        <button onClick={handleBestClick}>평점순</button>
        <button onClick={handleNewestClick}>최신순</button>
      </div>
      <ReviewList items={sortedItems} onDelete={handleDelelte}></ReviewList>
    </div>
  );
}

export default App;
