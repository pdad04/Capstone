import { ADD_MOVIE } from './actions'

const defaultState = {
    watchList: []
}

export function updateWatchList(state = defaultState, action) {
    switch(action.type){
        case 'ADD_MOVIE':
            if(!state.watchList){
                state = Object.assign({}, state, {watchList: []})
            }

            return Object.assign({}, state, {watchList: [...state.watchList, action.payload]} ); 
        /******* REMOVE FOR FINAL PRODUCTION VERSION ********/
        case 'STARTUP':
            return Object.assign({}, state, {watchList: []});
        default:
            return state;
    }
}