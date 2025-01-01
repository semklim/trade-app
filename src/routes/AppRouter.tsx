import { Route, Routes } from 'react-router-dom';

import { routeConfig } from './routerConfig';

function AppRouter() {
  return (
      <Routes>
        {routeConfig.map(({ element, path }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
  );
}

export { AppRouter };
