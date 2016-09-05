/**
 * Created by maoshuchen on 9/3/2016.
 */

function autoReducerCreator(reducer, id) {
    return function (state, action) {
        let newState = reducer(state, action);
        if(newState != state){//we do not process handled state.
            return newState;
        }

        //process not handled state
        newState = {...state, ...action[id]};
        return newState;
    }
}

export default function equipSword(param, id) {
    if(typeof param == 'function'){
        return autoReducerCreator(param, id);
    } else if(typeof param == 'object'){
        let reducerMap = {};
        for(let key in param){
            reducerMap[key] = autoReducerCreator(param[key], key);
        }
        return reducerMap;
    }
}