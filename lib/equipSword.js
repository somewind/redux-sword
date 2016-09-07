/**
 * Created by maoshuchen on 9/3/2016.
 */

function autoReducerCreator(reducer, id) {
    return function (state, action) {
        var newState = reducer(state, action);
        if(newState != state){//we do not process handled state.
            return newState;
        }

        //ignore other reducer
        var updateState = action[id];
        if(typeof updateState == 'undefined'){
            return newState;
        }

        //process not handled state
        newState = {};
        for (var key in state){
            if(updateState.hasOwnProperty(key)){
                newState[key] = updateState[key];
            } else{
                newState[key] = state[key];
            }
        }

        return newState;
    }
}

module.exports = function (param, id) {
    if(typeof param == 'function'){
        return autoReducerCreator(param, id);
    } else if(typeof param == 'object'){
        var reducerMap = {};
        for(var key in param){
            let obj = param[key];
            if(typeof obj == 'function') {
                reducerMap[key] = autoReducerCreator(obj, key);
            } else{
                reducerMap[key] = autoReducerCreator((state = obj) => state, key);
            }
        }
        return reducerMap;
    }
}