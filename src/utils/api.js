import axios from 'axios'

const myApi = axios.create({
    baseURL: 'https://hyunjungs-nc-news.herokuapp.com/api'
})

export const fetchTopics = () => {
    return myApi.get('/topics')
    .then(({ data }) => {
        return data.topics;
    })
}

export const fetchArticles = () => {
    return myApi.get('/articles')
    .then(({ data }) => {
        return data.articles;
    })
}