import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homescreen from './Screens/Homescreen';
import Updatescreen from './Screens/Updatescreen';
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Homescreen /> } exact />
        <Route path='/update/:id' element ={ <Updatescreen /> } />
      </Routes>
    </Router>
  );
}

export default App;
