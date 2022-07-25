import React from 'react';
import { Provider } from 'react-redux';
import { store } from '$src/redux/store';
import Routes from '$src/routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
