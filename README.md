# React + Vite + Redux 

To run:

```bash
npm run dev
```

## Branch Configurations

Branch `plain-react` manages state manually using react's useState. 

Branch `redux` uses redux to manage state. 

# Redux

Why Redux?
- State management is difficult when sharing data between components. This leads to "props drilling". 
- "React Context" can hold and provide entire application global state, which can lead to chaos (bugs, maintainability issues).
- Global State + Strict Rules = Redux.

## Parts of Redux
- Redux Store: global state for our app.
  - Cannot be modified directly. 
- Redux Actions: components trigger actions when something happens.
- Reducers: define how the Redux store should change when a specific action happens.
  - E-comm example: when add-to-cart action happens, new item should appear in user's cart. 
- Components can only change the state by triggering actions.

Leads to unidirectional data flow:
  - A component triggers an action
  - Reducer determines what changes should be made to the store
  - Store is updated
  - Components receive the updated state

## Adding Redux to a react app

Install packages:

```bash
npm install @reduxjs/toolkit react-redux
```

In entry-point to the app (main.jsx):

```js
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: {},
});

// wrap our components inside our provider, 
// which allows components to access and modify our store using actions
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
```

What actions does our app have?
- Create todos
- Delete todos 
- Mark todos as completed

## Redux Alternatives: Recoil
- A simplier solution with less 'nouns' (like reducer)

```
npm install recoil
```

To add it to your project, use a recoil root.

```js
//main.jsx
import { RecoilRoot } from 'recoil';

<Provider store={store}>
    <RecoilRoot>
        <App />
    </RecoilRoot>
</Provider>

```

```js
//atoms.js
import { atom } from 'recoil';

// a single piece of state that any recoil components can access
export const todos = atom({
    key: 'todos',
    default: [{ text: 'Talk about Recoil', isCompleted: false }],
})
```

```js
//todolist.jsx
import { useRecoilValue } from 'recoil';
import { todos as todosAtom } from './atoms';

// const todos = useSelector(state => state.todos.value );
// to read the value
const todos = useRecoilValue(todosAtom);

// to modify the value
const [todos, setTodos] = useRecoilState(todosAtom);
```


# Redux Thunk

- Redux manages app state
- Components manage app UI
  - ... they also manage data fetching
- Thunks give us a place to define our app's side effects (data fetching)

## How does Redux Thunk work?
- A component dispatches a thunk instead of an action.
- The logic inside the thunk is executed
- The thunk can dispatch actions and has read-only access to the store.
- (Can do same things as components, but give us a separate place to put the logic)

# Redux Selectors
Why do we need them? The structure of our redux Store can change.
- state.todos.value -> state.resources.todos.value
- state.todos.value -> state.todos.completed, state.todos.incomplete

Selectors give us a way to define our info, and send it to components.

Abstracted away into `src/selectors.js`. 

# Styled components 

Separate styles and style logic from our components.


# Testing React Ecosystems

The tools gave us ways to isolate different types of code, which makes our apps easier to test.

## Testing reducers

You want to be able to test every reducer (every action) -- does every reduce modify the state in the way we want it to? 

```bash
$ node src/tests/loadingSlice.test.js

loadingComplete reducer works.
```


# Q
I've heard there is a cost associated everytime you use one of these: 

- useSelector
- useState
- useEffect 