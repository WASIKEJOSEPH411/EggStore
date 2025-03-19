import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './components/landingPage/LandingPage';
import AddChickenProduct from './components/AddChickenProduct/AddChickenProduct';
import AddGradeEgg from './components/AddGradeEgg/AddGradeEgg';
import AddDrinks from './components/AddDrinks/AddDrinks';
import AddKienyejiEgg from './components/AddKienyejiEgg/AddKienyejiEgg';
import ChickenProduct from './components/ChickenProduct/ChickenProduct';
import Drinks from './components/Drinks/Drinks';
import EditChickenProduct from './components/EditChickenProduct/EditChickenProduct';
import EditDrinks from './components/EditDrinks/EditDrinks';
import EditGradeEgg from './components/EditGradeEgg/EditGradeEgg';
import EditKienyejiEgg from './components/EditKienyejiEgg/EditKienyejiEgg';
import GradeEgg from './components/GradeEgg/GradeEgg';
import KienyejiEgg from './components/KienyejiEgg/KienyejiEgg';
import Admin from './components/Admin/Admin';
import AdminLogin from './components/AdminLogin/AdminLogin';


import AdminChickenListing from './components/AdminChikenLIsting/AdminChickenListing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/addchickenproduct" element={<AddChickenProduct />} />
        <Route path="/adddrinks" element={<AddDrinks />} />
        <Route path="/addgradeegg" element={<AddGradeEgg />} />
        <Route path="/addkienyejiegg" element={<AddKienyejiEgg />} />
        <Route path="/chickenproduct" element={<ChickenProduct />} />
        <Route path="/drinks" element={<Drinks />} />
        <Route path="/editchickenproduct/:id" element={<EditChickenProduct />} />
        <Route path="/editdrinks" element={<EditDrinks />} />
        <Route path="/editgradeegg" element={<EditGradeEgg />} />
        <Route path="/editkienyejiegg" element={<EditKienyejiEgg />} />
        <Route path="/gradeegg" element={<GradeEgg />} />
        <Route path="/kienyejiegg" element={<KienyejiEgg/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/admin-login" element={<AdminLogin/>}/>
        <Route path="/adminchikenlisting" element={<AdminChickenListing/>}/>
      </Routes>
    </Router>
  );
}

export default App;
