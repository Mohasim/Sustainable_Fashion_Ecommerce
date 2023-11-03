
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MediaCard from '@/components/MediaCard';

export default function HomePage() {
  return (
    <Box sx={{ display: 'flex' }}>
      <div>
        <Typography textAlign={'center'} marginBlock={'50'} variant="h1" component="h2">
          Home Page
        </Typography>
        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid xs={4}>
            <MediaCard
              imageurl='https://rukminim1.flixcart.com/image/450/500/xif0q/shoe/7/2/m/6-tm-12-6-trm-white-original-imagjqyzz8z9jrgf.jpeg?q=90&crop=false'
              heading="Shoe 1"
              text="The durable rubber outsole offers superior traction on any surface, making them perfect for your daily adventures."
            />
          </Grid>
          <Grid xs={4}>
            <MediaCard
              imageurl='https://images.prismic.io/sportsshoesprod/efd094c5-81f9-4624-bb82-098566268ace_HOKA_M_CLIFTON9_GTX_BBLC_DTL__JL_P8076.jpg?auto=compress,format&rect=1077,504,931,931&w=1000&h=1000'
              heading="Shoe 2"
              text="The durable rubber outsole offers superior traction on any surface, making them perfect for your daily adventures."
            />
          </Grid>
          <Grid xs={4}>
            <MediaCard
              imageurl='https://images.pexels.com/photos/19090/pexels-photo.jpg?cs=srgb&dl=pexels-web-donut-19090.jpg&fm=jpg'
              heading="Shoe 3"
              text="The durable rubber outsole offers superior traction on any surface, making them perfect for your daily adventures."
            />
          </Grid>
          <Grid xs={4}>
            <MediaCard
              imageurl='https://www.campusshoes.com/cdn/shop/products/FIRST_11G-787_WHT-SIL-B.ORG.jpg?v=1670326183'
              heading="Shoe 4"
              text="The durable rubber outsole offers superior traction on any surface, making them perfect for your daily adventures."
            />
          </Grid>
        </Grid>
      </div>
      {/* <Drawer
        sx={{
          width: 122,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '12%',
            boxSizing: 'border-box',
            top: ['48px', '56px', '64px'],
            height: 'auto',
            bottom: 0,
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <List sx={{ px: 2 }}>
          <ListItem disablePadding>
            <Typography variant="overline" sx={{ fontWeight: 500 }}>
              On this page
            </Typography>
          </ListItem>
        </List>
      </Drawer> */}
    </Box>
  );
}
