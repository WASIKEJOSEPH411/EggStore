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
import AdminDrinkList from './components/AdminDrinkList/AdminDrinkList';
import AdminGradeEggList from './components/AdminGradeEggListing/AdminGradeEggListing';
import AdminKienyejiEggList from './components/AdminKienyejiList/AdminKienyejiEggList';
import Order from './components/Order/Order';
import AdminOrder from './components/AdminOrder/AdminOrder';
import Signin from './components/SignIn/Signin';
import Signup from './components/SignUp/Signup';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/addchickenproduct" element={<AddChickenProduct />} />
        <Route path="/adddrinks" element={<AddDrinks />} />
        <Route path="/addgradeegg" element={<AddGradeEgg />} />
        <Route path="/addkienyejiegg" element={<AddKienyejiEgg />} />
        
        <Route path="/chickenproduct" element={<ChickenProduct />} />
        <Route path="/drinks" element={<Drinks />} />
        <Route path="/gradeegg" element={<GradeEgg />} />
        <Route path="/kienyejiegg" element={<KienyejiEgg />} />
        
        <Route path="/editchickenproduct/:id" element={<EditChickenProduct />} />
        <Route path="/editdrinkproduct/:id" element={<EditDrinks />} />
        <Route path="/editgradeegg/:id" element={<EditGradeEgg />} />
        <Route path="/editkienyejiegg/:id" element={<EditKienyejiEgg />} />
        
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        
        <Route path="/adminchikenlisting" element={<AdminChickenListing />} />
        <Route path="/admindrinklist" element={<AdminDrinkList />} />
        <Route path="/admingradeegglist" element={<AdminGradeEggList />} />
        <Route path="/adminkienyejiegglist" element={<AdminKienyejiEggList />} />
        
        <Route path="/order" element={<Order />} />
        <Route path="/adminorder" element={<AdminOrder />} />
        
        
      </Routes>
    </Router>
  );
}

export default App;
