import { CardContent, Typography, Card as MaterialCard } from "@mui/material";

interface CardProps {
  id: string;
  title: string;
  description: string;
}

const Card = (props: CardProps) => {
  return (
    <MaterialCard key={props.id}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
    </MaterialCard>
  );
};

export default Card;
