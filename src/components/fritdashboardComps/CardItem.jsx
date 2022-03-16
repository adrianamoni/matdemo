import { styled } from "@mui/material/styles";
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import HalfDoughnut from "../../widgets/halfDoughnut/HalfDoughnut";
import Text from "../../languages/Text";
const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

const CardItem = ({ data, line }) => {
  const [raise, setRaise] = useState(false);
  const randomNumber = 25;

  return (
    <Card
      raised={raise}
      onMouseEnter={() => setRaise(true)}
      onMouseLeave={() => setRaise(false)}
    >
      <CardActionArea>
        <StyledLink to={`/detalle-orden`}>
          <CardHeader
            component="div"
            /*  sx={{ bgcolor: color, color: "#fff", mb: 2 }} */
            title={line}
          />
          <HalfDoughnut value={[randomNumber.toFixed(2)]} />
          <CardContent>
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                  <strong>{Text({ tid: "product" })}</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h8" gutterBottom>
                  000000000003452612 (BOB.CASERAS 170G 412 MM)
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                  <strong>{Text({ tid: "order" })}</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h8" gutterBottom>
                  OFFRIT015306363
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </StyledLink>
      </CardActionArea>
    </Card>
  );
};

export default CardItem;
