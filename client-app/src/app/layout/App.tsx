import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../features/activities/home/HomePage';

function App() {
  const location = useLocation();

  return (
      <>
        {location.pathname === '/' ? <HomePage /> : (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Outlet />
            </Container>
          </>
        )}
      </>
  );
}
export default observer(App);


/*
React Router Outlet: İç içe oluşturulmuş route işlemlerinde içteki route içeriğinin sayfanın neresinde gösterileceğini belirten React Route component'i.
*/