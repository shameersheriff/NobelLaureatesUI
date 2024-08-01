import { CardContent, Typography, Card as MaterialCard } from "@mui/material";
import { NobelLaureate } from "../../../models/nobelLaureates.model";

interface CardProps {
  laureate: NobelLaureate;
}

const Card = (props: CardProps) => {
  return (
    <MaterialCard key={props.laureate.Id} style={{ height: "100%" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.laureate.FullName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.laureate.NobelPrizes[0].CategoryFullName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.laureate.NobelPrizes[0].Motivation}
        </Typography>
      </CardContent>
    </MaterialCard>
  );
};

export default Card;
