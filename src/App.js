import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CreateCoupon from "./pages/CreateCoupon";
import DisplayCoupons from "./pages/DisplayCoupons";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route path="/create-coupon/">
            <CreateCoupon />
          </Route>

          <Route exact path="/all-coupons/">
            <DisplayCoupons />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
