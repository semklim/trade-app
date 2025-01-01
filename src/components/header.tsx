import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { AppRoutes, RoutePath } from '@/routes/routerConfig';

const Header = () => {
  const location = useLocation();
  const navigation = [
    { name: 'Transactions', path: RoutePath[AppRoutes.TRANSACTIONS] },
    { name: 'Currency', path: RoutePath[AppRoutes.CURRENCY] },
    { name: 'Cash Desk', path: RoutePath[AppRoutes.CASH_DESK] },
    { name: 'Clients', path: RoutePath[AppRoutes.CLIENTS] },
  ];

  return (
    <header className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4">
      <nav className="flex justify-around items-center">
        {navigation.map((item) => (
          <Button
            key={item.path}
            variant={location.pathname === item.path ? "default" : "ghost"}
            asChild
          >
            <Link to={item.path}>{item.name}</Link>
          </Button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
