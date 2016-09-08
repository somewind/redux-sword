### What is Redux-Sword
[![npm](https://img.shields.io/npm/v/redux-sword.svg?maxAge=2592000)](https://www.npmjs.com/package/redux-sword)
[![npm](https://img.shields.io/npm/dt/redux-sword.svg?maxAge=2592000)](https://www.npmjs.com/package/redux-sword)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/somewind/redux-sword/master/LICENSE)

`Redux-Sword` is a tool for `Redux Reducer`, which can make it automatically processed, so you can code less with it.

### Installation

To install the stable version:

```
npm install --save-dev redux-sword
```

### How to Use?

reducer's definition

```js

import {combineReducers} from 'redux'
import {equipSword} from 'redux-sword'

const initailStateMain = {
    userName: '',
    userNick: '',
    isLogined: false,
};

const initailStateProject = {
    projectId: 0,
    projectName: ''
};

const reducers = combineReducers(equipSword({
    main : initailStateMain,
    project: initailStateProject
}));

export default reducers;

```

dispatch useage

```js

dispatch({
    type: 'ON_LOGIN', 

    // 'main' is your reducer name, 
    // automatically process use this to match your reducer
    main: { 
        userName: 'maoshuchen',
        userNick: 'somewind',
        isLogined: true
    }
});

```

### More

`index.js` for combine reducers

```js

import {combineReducers} from 'redux'
// Here is the magic function
import {equipSword} from 'redux-sword'
// 'main' or 'project' is your reducer
import main from './main'
import project from './project'

//Use equipSword to make your reducer map a auto reducer map.
//You need keep 'main' and 'project' reducer to keep the different names.
//Here 'main' reducer with name 'main', 'project' reducer with name 'project', so, it's ok.
const reducers = combineReducers(equipSword({
    main,
    project
}));

export default reducers;

```

`main.js` reducer

```js

const initailState = {
    userName: '',
    userNick: '',
    isLogined: false,
};

export default function (state = initailState, action) {
    switch (action.type) {
        //1.The following code can be automatically processed
        //case 'ON_LOGIN':
        //  return {
        //      ...state,
        //      userName: action.main.userName,
        //      userNick: action.main.userNick,
        //      isLogined: action.main.isLogined,
        //  }
        //  break;

        //2.If you have some logic code just like the following code has 'if(action.isLogoutSuccess)', 
        //you can write the case, the automatically process can be override.
        case 'ON_LOGOUT':
            if(action.isLogoutSuccess){
                return {
                    ...state,
                    userName: '',
                    userNick: '',
                    isLogined: false
                }
            }
            break;
        default :
            return state;
    }
};

```

dispatch useage

```js

dispatch({
    type: 'ON_LOGIN', 

    // 'main' is your reducer name, 
    // automatically process use this to match your reducer
    main: { 
        userName: 'maoshuchen',
        userNick: 'somewind',
        isLogined: true
    }
});

```

### License

MIT
