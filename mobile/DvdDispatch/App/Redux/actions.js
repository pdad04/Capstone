export function addMovie(movie){
    return {
        type: 'ADD_MOVIE',
        payload: movie
    }
}

export function deleteMovie(index){
    return{
        type: 'DELETE_MOVIE',
        payload: parseInt(index)
    }
}