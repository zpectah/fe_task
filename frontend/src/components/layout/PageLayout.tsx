import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { styled, Box } from '@mui/material';
import { LayoutPreloader } from '../preloader';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { HEADER_DESKTOP_HEIGHT } from '../../constants';

const Wrapper = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const Main = styled(Box)({
  paddingTop: HEADER_DESKTOP_HEIGHT,
  flex: 1,
});

const PageLayout = () => {
  return (
    <Wrapper>
      <Header />
      <Main component="main">
        <Suspense fallback={<LayoutPreloader />}>
          <Outlet />
        </Suspense>
      </Main>
      <Footer />
    </Wrapper>
  );
};

export default PageLayout;
