import React, { useState } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { Input, Typography, Button } from 'antd';
import { useStores } from '../hooks/useStores';

import { VirtualTable } from './index';
import moment from 'moment';

const { Title } = Typography;

const App = observer(() => {
  const { searchStore }           = useStores();
  const [searchStr, setSearchStr] = useState();

  const search = () => searchStore.search(searchStr);

  const onChangeSearch = (e) => setSearchStr(e.target.value);

  const columns = [
    {
      dataIndex: 'timestamp',
      title: 'Date',
    },
    {
      dataIndex: 'from',
      title: 'From',
    },
    {
      dataIndex: 'to',
      title: 'To',
    },
    {
      dataIndex: 'value',
      title: 'Value',
    },
  ];

  return (
    <Container>
      <Title level={1}>Ethereum transactions search</Title>
      <Input
        placeholder={'enter a transaction hash'}
        style={{ width: 400 }}
        onChange={onChangeSearch}
      />
      <Button onClick={search}>Search</Button>

      <VirtualTable
        columns={columns}
        dataSource={searchStore.results}
        scroll={{
          y: 800,
          x: '100%'
        }}
        style={{
          marginTop: 50
        }}
      />
    </Container>
  );
});

const Container = styled.div`
  height: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding:  50px;
  text-align: center;  
  
`;

export default App;
