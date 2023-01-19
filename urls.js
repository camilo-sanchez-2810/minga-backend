let apiUrl = 'http://localhost:8080'

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV==='production'){
    api = process.env.REACT_APP_URL
}

madule.exports= apiUrl