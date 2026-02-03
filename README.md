# Todo List App

A modern React application demonstrating Redux state management, async operations with Redux Thunk, and reusable component patterns. Built with Vite, React, Redux Toolkit, and styled with Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm

### Installation

```bash
npm install
```

### Running the Application

This application requires **two separate processes** to run:

1. **Frontend Development Server** (Vite):
   ```bash
   npm run dev
   ```
   This starts the Vite development server, typically on `http://localhost:5173`

2. **Backend API Server** (Express):
   ```bash
   node server.js
   ```
   This starts the Express server on `http://localhost:3000`

**Note:** The frontend (`npm run dev`) does **not** automatically start the backend server. You must run both commands in separate terminal windows.

### Other Available Scripts

- `npm run build` - Build the production bundle
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## Project Structure

- `/src` - React components and application code
  - `/slices` - Redux slice definitions
  - `/thunks` - Redux thunk functions for async operations
  - `/selectors` - Redux selector functions
  - `/tests` - Test files for reducers and selectors
- `server.js` - Express backend server
- `vite.config.js` - Vite configuration
- `tailwind.config.cjs` - Tailwind CSS configuration

## Branch Configurations

- `plain-react` - Manages state manually using React's `useState`
- `redux` - Uses Redux for centralized state management (current branch)

## Technology Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **Redux Thunk** - Async middleware
- **Tailwind CSS** - Utility-first CSS framework
- **Express** - Backend API server

---

# Redux Concepts


# Redux Concepts

## Why Redux?

- **State management complexity**: Sharing data between components leads to "props drilling"
- **React Context limitations**: While it can hold global state, it lacks the structure needed for large applications
- **Predictable state**: Global State + Strict Rules = Redux

## Core Parts of Redux

### Redux Store
Global state for the application. Cannot be modified directly - only through dispatching actions.

### Redux Actions
Events that components trigger when something happens (e.g., user clicks a button).

### Reducers
Pure functions that define how the store should change when a specific action is dispatched.

**Example**: When an `add-to-cart` action is dispatched, the reducer adds the new item to the user's cart in the store.

## Unidirectional Data Flow

1. A component dispatches an action
2. Reducer determines what changes should be made to the store
3. Store is updated
4. Components receive the updated state via selectors

## Setup Instructions

### Installing Redux

```bash
npm install @reduxjs/toolkit react-redux
```

### Basic Configuration

In your entry point ([main.jsx](src/main.jsx)):

```js
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: {
    // Add your slice reducers here
  },
});

// Wrap components with Provider to access the store
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
```

## This App's Actions

- Create todos
- Delete todos
- Mark todos as completed

---

# Redux Thunk

**Purpose**: Provides a place to define side effects (like data fetching) separately from components.

## How It Works

1. A component dispatches a **thunk** (instead of a plain action)
2. The thunk logic executes (e.g., API call)
3. The thunk can dispatch regular actions based on the result
4. The thunk has read-only access to the store

This separates data-fetching logic from UI components, making both easier to test and maintain.

---

# Redux Selectors

**Why use selectors?** The structure of your Redux store can change over time:

- `state.todos.value` → `state.resources.todos.value`
- `state.todos.value` → `state.todos.completed`, `state.todos.incomplete`

**Solution**: Selectors abstract away the store structure, providing a stable interface for components to access state.

Implementation: See [src/selectors/selectors.js](src/selectors/selectors.js)

---

# Testing

## Testing Reducers and Slices

Redux's modular structure makes testing straightforward. Each reducer can be tested in isolation to verify it modifies state correctly.

**Example test run**:

```bash
node src/tests/loadingSlice.test.js
```

**Output**:
```
loadingComplete reducer works.
```

See the [src/tests/](src/tests/) directory for examples of:
- Testing reducer logic ([loadingSlice.test.js](src/tests/loadingSlice.test.js))
- Testing selector functions ([selectors.test.js](src/tests/selectors.test.js))

---

# Additional Libraries

## Redux Alternatives: Recoil

A simpler state management solution with less boilerplate than Redux.

```bash
npm install recoil
```

### Setup

```js
// main.jsx
import { RecoilRoot } from 'recoil';

<Provider store={store}>
  <RecoilRoot>
    <App />
  </RecoilRoot>
</Provider>
```

### Define State Atoms

```js
// atoms.js
import { atom } from 'recoil';

export const todos = atom({
  key: 'todos',
  default: [{ text: 'Talk about Recoil', isCompleted: false }],
})
```

### Using Atoms in Components

```js
// TodoList.jsx
import { useRecoilValue, useRecoilState } from 'recoil';
import { todos as todosAtom } from './atoms';

// Read-only access
const todos = useRecoilValue(todosAtom);

// Read and write access
const [todos, setTodos] = useRecoilState(todosAtom);
```

## Styled Components

For CSS-in-JS styling with component-scoped styles:

```bash
npm install styled-components
```

This separates styles and style logic from component markup, though this project currently uses Tailwind CSS.

---

# FAQ

## What is the cost of React hooks?

**Question**: Is there a performance cost associated with using these hooks?
- `useSelector`
- `useState`
- `useEffect`

**Answer**: Yes, there is a small computational cost, but it's generally negligible:

- **`useSelector`**: Runs every time the Redux store updates. If your selector is expensive, use memoized selectors (with `reselect` or `createSelector` from Redux Toolkit)
- **`useState`**: Very lightweight. Only triggers re-render when state actually changes
- **`useEffect`**: Runs after every render (by default). Control when it runs using the dependency array to optimize performance

**Best practices**:
1. Use the dependency array in `useEffect` to control when it runs
2. Memoize expensive selectors
3. Split components to avoid unnecessary re-renders
4. Use `React.memo()` for expensive components that receive the same props

The cost is minimal for most applications. Only optimize if you measure actual performance issues. 