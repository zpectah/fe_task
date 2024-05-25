import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { styled, Box } from '@mui/material';
import { LayoutPreloader } from '../preloader';
import { Header } from '../Header';
import { Footer } from '../Footer';

const Wrapper = styled(Box)({
  width: '100%',
  height: '100%',
});

const PageLayout = () => {
  return (
    <Wrapper>
      <Header />
      <Suspense fallback={<LayoutPreloader />}>
        <Outlet />
      </Suspense>
      <Footer />
    </Wrapper>
  );
};

export default PageLayout;
