import Copyright from '@/app/components/Copyright';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import NextLink from 'next/link';


export default async function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ m: 2 }}>
          Phần mềm quản lý bán hàng - Lọ Lem Shop
        </Typography>
        <Link href="/products" color="primary" component={NextLink}>
          Go to the Products page
        </Link>
        <Image src="/girl-with-cosmetics.svg" alt="girl with cosmetics" width={500} height={500} />
        <Copyright />

      </Box>
    </Container>
  );
}
