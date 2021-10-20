import 'bootstrap/dist/css/bootstrap.min.css';

import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import { HomePage } from './screens/HomePage';
import { ProductPage } from './screens/ProductPage';
import { CartPage } from './screens/CartPage';
import LoginPage from './screens/LoginPage';

function App() {
  return (
    <Router>
      <Header />
      <main className='main'>
          <Route exact path='/' component={HomePage} />
          <Route path='/product/:id' component={ProductPage} />
          <Route path='/cart/:id?' component={CartPage} />
          <Route path='/login' component={LoginPage} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
