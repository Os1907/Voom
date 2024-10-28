import data from '../assets/data.json';

export const findMinPrice = () => Math.min(...data.map( item => item.price)); 