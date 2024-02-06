import ReviewList from './ReviewList';
import { useState } from 'react';
import { getReviews } from '../api';
function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState('rating');
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder('createdAt');
  const handleBestClick = () => setOrder('rating');

  const handleDelelte = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoadClick = async () => {
    const { reviews } = await getReviews();
    setItems(reviews);
  };

  return (
    <div>
      <div>
        <button onClick={handleBestClick}>평점순</button>
        <button onClick={handleNewestClick}>최신순</button>
      </div>
      <ReviewList items={sortedItems} onDelete={handleDelelte}></ReviewList>
      <button onClick={handleLoadClick}>불러오기</button>
    </div>
  );
}

export default App;
