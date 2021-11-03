import { CardMedia, Container } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../../actions/users';

const User = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, isLoading, isError } = useUser(id);

  if (isError)
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>{isError}</h1>
      </div>
    );
  if (isLoading)
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Loading...</h1>
      </div>
    );
  return (
    <div>
      <Container>
        <CardMedia
          component="img"
          height="100%"
          image={user.avatar}
          alt="image"
        />
      </Container>
    </div>
  );
};

export default User;
