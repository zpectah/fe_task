import { styled, Box, Container, BoxProps, ContainerProps } from '@mui/material';
import { WithChildren } from '../../types';
import { CONTAINER_MAX_WIDTH_DEFAULT } from '../../constants';
import { ViewHeading, ViewHeadingProps } from '../ViewHeading';

const Wrapper = styled(Box)({
  width: '100%',

  flex: 1, // TODO
});

interface ViewLayoutProps extends WithChildren {
  maxWidth?: ContainerProps['maxWidth'];
  wrapperProps?: Partial<BoxProps>;
  containerProps?: Partial<Omit<ContainerProps, 'maxWidth'>>;
  heading?: ViewHeadingProps;
}

const ViewLayout = ({
  maxWidth = CONTAINER_MAX_WIDTH_DEFAULT,
  children,
  wrapperProps,
  containerProps,
  heading,
}: ViewLayoutProps) => {
  return (
    <Wrapper {...wrapperProps}>
      <Container maxWidth={maxWidth} {...containerProps}>
        {heading && <ViewHeading {...heading} />}
        <div>{children}</div>
      </Container>
    </Wrapper>
  );
};

export default ViewLayout;
