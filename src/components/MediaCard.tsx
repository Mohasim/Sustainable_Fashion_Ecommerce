import * as React from 'react';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({ heading, text, imageurl,altText }: { heading: string; text: string; imageurl: string; altText: string; }) {
  return (
    <Card>
      <Image
        alt={altText}
        src={imageurl}
        width={640}
        height={480}

      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {heading}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to Cart</Button>
        <Button size="small">Details</Button>
      </CardActions>
    </Card>
  );
}
