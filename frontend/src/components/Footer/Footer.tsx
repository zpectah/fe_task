import { styled, Box, BoxProps, Container } from '@mui/material';
import { CONTAINER_MAX_WIDTH_DEFAULT } from '../../constants';

const Wrapper = styled(Box)({});

interface FooterProps {
  wrapperProps?: Partial<Omit<BoxProps, 'component'>>;
}

const Footer = ({ wrapperProps }: FooterProps) => {
  return (
    <Wrapper component="footer" {...wrapperProps}>
      <Container maxWidth={CONTAINER_MAX_WIDTH_DEFAULT}>...Footer...(some copyright?)</Container>
    </Wrapper>
  );
};

export default Footer;
