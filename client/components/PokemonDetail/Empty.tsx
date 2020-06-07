import React from 'react';
import { Row, Empty as AntEmpty } from 'antd';

const Empty: React.FC = () => (
  <Row align="middle" justify="center" style={{ height: '100%' }}>
    <AntEmpty style={{ height: 'auto' }} description="No Pokémon Selected" />
  </Row>
);

export default Empty;
