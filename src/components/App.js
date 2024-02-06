import ReviewList from './ReviewList';
import mockItems from '../mock.json';
import { useState } from 'react';
function App() {
  const [items, setItems] = useState(mockItems);
  const [order, setOrder] = useState('rating');
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder('createdAt');
  const handleBestClick = () => setOrder('rating');

  const handleDelelte = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };
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
