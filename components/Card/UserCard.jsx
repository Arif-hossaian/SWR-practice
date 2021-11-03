import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';
import Link from 'next/link';

const UserCard = ({ user }) => {
  return (
    <div>
      <Link href={`/users/${user?.id}`} passHref>
        <Card sx={{ maxWidth: 545 }}>
          <CardMedia
            component="img"
            height="360"
            image={user.avatar}
            alt="image"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ textAlign: 'center' }}
            >
              {user.name}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default UserCard;
