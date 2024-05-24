import { styled, Box, Container, BoxProps } from '@mui/material';
import { LAYOUT_MAX_WIDTH_DEFAULT } from '../../constants';

const Wrapper = styled(Box)({});

interface HeaderProps {
  wrapperProps?: Partial<Omit<BoxProps, 'component'>>;
}

const Header = ({ wrapperProps }: HeaderProps) => {
  return (
    <Wrapper component="header" {...wrapperProps}>
      <Container maxWidth={LAYOUT_MAX_WIDTH_DEFAULT}>...Header...(logo, main menu)</Container>
    </Wrapper>
  );
};

export default Header;
