// Import stylesheets
import './style.css';
import Fuse from 'fuse.js';

let stringList = [
  'dum apple and orange',
  'cherry banana ke liye',
  'cherry ka dum',
  'apple dum cherry apricot ka ai',
  'dum grape nahi khate',
  'Mango mehnga hai',
  'cherry ka shor'
];

function searchStrings(query:string, stringList:string[]) {
  const options = {
    includeScore: true,
    keys: ['original']
  };

  const fuse = new Fuse(stringList.map(original => ({ original, highlighted: original })), options);
  const result = fuse.search(query);

  return result.map(item => ({
    original: item.item.original,
    highlighted: item.item.highlighted.replace(
      new RegExp(`(${item.matches.map(match => match.value).join('|')})`, 'gi'),
      '<mark>$1</mark>'
    )
  }));
}

// Example usage
const query = 'chery ka'; // Typo in 'cherry' for testing fuzzy search
const searchResults = searchStrings(query, stringList);
console.log(searchResults);