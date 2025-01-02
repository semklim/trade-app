import { AppRouter } from '@/routes/AppRouter';
// import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header';
// import { store } from './store';

function App() {
  return (
    <BrowserRouter>
    {/* <Provider store={store}> */}
        <div className="min-h-screen bg-background">
          <AppRouter />
          <Header />
        </div>
    {/* </Provider> */}
    </BrowserRouter>
  );
}

export default App;
