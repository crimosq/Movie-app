const request = require('postman-request')
const APIKEY = '9afb3f6495bd7301e701e09cc5096ee3'
const movieSimilar = require('./movieSimilar'); 


const movielookUp = (moviename, callback)=>{
    url ='https://api.themoviedb.org/3/search/movie?query='+ moviename + '&api_key=' + APIKEY
    request({url, json: true}, (err, {body})=>{
        if(err){
            callback('Unable to connect', undefined)
        }else if (res.body.results.length === 0){
            callback(' Try again', undefined)
        }else{
            callback(undefined,{
                movieID: body.results[0].id,
                movieTitle:  body.request[0].original_title,
                img_path: body.request[0].poster_path
            })
        }
    })
}


module.exports = movielookUp;


