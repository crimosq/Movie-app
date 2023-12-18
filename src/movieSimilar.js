const request = require('postman-request')
const APIKEY = '9afb3f6495bd7301e701e09cc5096ee3'

const movieSimilar = (movieID, callback) =>{
    const url = 'https://api.themoviedb.org/3/movie/'+ movieID +'/similar?language=en-US&page=1'+ '&api_key=' + APIKEY
request({url, json: true},(err, res)=> {
    if(err){
        callback('Unable to connect', undefined)
    }else if (res.body.results.length === 0){
        callback(' Try again', undefined)
    }else{
        callback(res.body.results)
    }
})
}


module.exports = movieSimilar;