import { Flex, Grid, Heading } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import React from 'react';
import { SideMenu } from '../components';

const Dashboard = () => {
  return (
    <Grid gridTemplateColumns={{ base: '250px 1fr', md: '250px 1fr' }}>
      <SideMenu />
      <Flex p={16}>
        <Heading>Dashboard</Heading>
      </Flex>
    </Grid>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
