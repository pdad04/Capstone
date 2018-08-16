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

export function updateMovie(movie) {
    return {
        type: 'UPDATE_MOVIE',
        payload: movie
    }
}