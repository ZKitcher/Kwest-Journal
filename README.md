# State Management with React Context and Hooks

This project demonstrates a simple yet effective state management setup using React Context API and custom hooks. It provides a way to manage global application state while persisting it in local storage.

## Features

- **Global Context**: Utilizes React Context to manage global state across components.
- **Reducer**: Implements a reducer function to handle state transitions based on dispatched actions.
- **Persistence**: Uses local storage to persist state between sessions.
- **Enum Class**: Provides an enumeration class for managing action types in a structured way.
- **Custom Hooks**: Includes custom hooks (readKwestJournal and usePersistedState) for easy state management and persistence.

## Usage
1. Import the StateProvider component and wrap it around your application's root component in index.js or App.js:

```javascript
import StateProvider from './path/to/StateProvider';

function App() {
    return (
        <StateProvider>
            <YourApp />
        </StateProvider>
    );
}
```

2. Access global state and dispatch actions using the readKwestJournal hook within your components:

```javascript
import { readKwestJournal } from './path/to/StateProvider';

function YourComponent() {
    const { state: { version }, helloWorld } = readKwestJournal();

    return (
        <div>
            <p>Current version: {version}</p>
            <button onClick={helloWorld}>Say Hello World!</button>
        </div>
    );
}
```

3. Customize the Reducer function to add more actions and manage state transitions according to your application's needs.

## API Reference

### StateProvider

- Props:
  - children: React component(s) to be wrapped by the provider.
  - localKey: Key used for local storage persistence.
  - initialValues: Initial state values.
  - reducer: Reducer function for handling state transitions.
  - clearState: Boolean to have the state cleared each init.

### readKwestJournal

- Returns:
  - state: Current global state.
  - dispatch: Function to dispatch actions.
  - Custom functions for interacting with global state (e.g., helloWorld).

### clearAllPersistedState

- Clears all persisted state related to Kwest-Journal from local storage.

### clearCache

- Clears all caches.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
