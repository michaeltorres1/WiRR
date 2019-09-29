import axios from 'axios';

export const createArticle = (article) => {
  // const body = JSON.stringify({article});
  // debugger;
  return (
    axios.post('/api/articles/', article)
  )
}

export const searchDB = (keyword) => {
  return (
    axios.get(`/api/articles/search/${keyword}`)
  )
}