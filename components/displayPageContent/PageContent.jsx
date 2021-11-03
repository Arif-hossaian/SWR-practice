import { Container, Grid } from '@mui/material';
import React from 'react';
import { useUsers } from '../../actions/users';
import UserCard from '../Card/UserCard';

const PageContent = ({ page, limit, search }) => {
  const { isLoading, isError, users } = useUsers(page, limit, search);
  if (isError) return <h2>{isError}</h2>;
  if (isLoading)
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Loading...</h1>
      </div>
    );
  return (
    <Container>
      <Grid container spacing={5}>
        {users.map((user) => (
          <Grid key={user.id} item xs={12} sm={12} md={4}>
            <UserCard key={user.id} user={user} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PageContent;
