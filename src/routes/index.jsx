import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Route, Navigate, Routes as Switch, BrowserRouter as Router } from "react-router-dom";

// authentication pages
import Login from "../desktop/auth/login";
import Signup from "../desktop/auth/signup";

// authenticated pages
import Account from "../desktop/account";
import Wallets from "../desktop/wallets";
import Dashboard from "../desktop/dashboard";
import Statistic from "../desktop/statistic";
import AccountMobile from "../mobile/account";
import Categories from "../mobile/categories";
import MobileWallets from "../mobile/wallets";
import WalletStats from "../mobile/walletStat";
import Transactions from "../mobile/transactions";

// error page
import NotFound from "../desktop/notFound";

import RequireAuth from "./requireAuth";

const Routes = () => {
  const { breakpoints } = useTheme();
  const isMdDown = useMediaQuery(breakpoints.down("md"));

  return (
    <Router>
      <Switch>
        {/* authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* authenticated routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/statistic" element={<Statistic />} />
          <Route
            path="/wallets"
            element={isMdDown ? <Navigate to="/mobile-wallets" /> : <Wallets />}
          />
          <Route
            path="/account"
            element={isMdDown ? <Navigate to="/mobile-account" /> : <Account />}
          />

          <Route path="/transactions" element={<Transactions />} />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/mobile-account"
            element={isMdDown ? <AccountMobile /> : <Navigate to="/account" />}
          />
          <Route
            path="/mobile-wallets"
            element={isMdDown ? <MobileWallets /> : <Navigate to="/wallets" />}
          />
          <Route
            path="/wallet-stats/:id"
            element={isMdDown ? <WalletStats /> : <Navigate to="/wallets" />}
          />
        </Route>
        {/* authenticated routes */}

        {/* error 404 page */}
        <Route path="*" element={<NotFound />} />
        {/* error 404 page */}
      </Switch>
    </Router>
  );
};

export default Routes;
