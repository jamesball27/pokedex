import React from 'react';
import { Spin } from 'antd';
import type { SpinProps } from 'antd/lib/spin';
import styled from 'styled-components';

const StyledSpinner = styled(Spin)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner: React.FC<SpinProps> = (props) => <StyledSpinner {...props} />;

export default Spinner;
