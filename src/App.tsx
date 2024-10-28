
import { useEffect, useState } from 'react';
import image from './assets/0-floor.png';
import data from './assets/data.json';
import { findMaxPrice } from './helper/findMax';
import { findMinPrice } from './helper/findMin';
import Polygon from './components/Polygon';
import Filters from './components/Filter';

const maxPrice = findMaxPrice();
const minPrice = findMinPrice();

const App= ()=>{
  const [type, setType] = useState(false);
  const [statusFilter, setStatusFilter] = useState('Show All');
  const [priceFilter, setPriceFilter] = useState([minPrice, maxPrice]);
  const [area] = useState([0, 107]);

  const filterData = data.filter(item => statusFilter === 'Show All' ? item : item.status === statusFilter.toLowerCase());

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const min = Math.min(Number(e.target.value), priceFilter[1] - 1000)
    setPriceFilter([min, priceFilter[1]]);
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max = Math.max(Number(e.target.value), priceFilter[0] + 1000)
    setPriceFilter([priceFilter[0], max]);
  }

  useEffect(() => {
    const elementsArray = Array.from(document.getElementsByTagName('polygon'));
    elementsArray.forEach(item => {
      const dataCode = item.getAttribute('data-code');
      const matchedItem = filterData.find(oneItem => oneItem.code.toString() === dataCode);
      if (statusFilter === 'Show All') {
        item.setAttribute('fill', (matchedItem && (matchedItem.price >= priceFilter[0] && matchedItem.price <= priceFilter[1])) ? '#ffffff00' : '#3271cc');
        item.style.cursor = 'pointer';
      } else if (matchedItem) {
        item.style.cursor = 'pointer';
        item.setAttribute('fill', (matchedItem.status !== statusFilter.toLowerCase() || matchedItem.price < priceFilter[0] || matchedItem.price > priceFilter[1]) ? '#3271cc' : '#ffffff00');
      } else {
        item.setAttribute('fill', '#3271cc');
        item.style.cursor = 'default';
      }
    });
  }, [statusFilter, filterData, priceFilter]);


  return (
    <>
      <img
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: '#272727',
          objectFit: 'contain'
        }}
        src={image}
      />

      <Polygon filterData={filterData} priceFilter={priceFilter} />
      <Filters
        area={area}
        minPrice={minPrice}
        maxPrice={maxPrice}
        type={type}
        setType={setType}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        handleMinChange={handleMinChange}
        handleMaxChange={handleMaxChange}
      />

    </>
  )
}

export default App

