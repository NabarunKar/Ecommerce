import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import UseFetch from "../hooks/useFetch";
import ProductItem from "../components/ProductItem";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Container,
  Grid,
  LinearProgress,
  List,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Orders() {
  const { user } = useAuthContext();

  const [data, isPending, error] = UseFetch(`/api/orders`, user.token);

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  return (
    <Container>
      <Container sx={{ my: 5 }}>
        <Container sx={{ textAlign: "center", mb: 5 }}>
          <Typography variant="h2">My Orders</Typography>
        </Container>
        <Grid container>
          <Grid item xs={12} sm={10} md={8} sx={{ margin: "auto" }}>
            {isPending && <LinearProgress />}
            {error && (
              <Container sx={{ mt: 5 }}>
                <Alert severity="error">{error}</Alert>
              </Container>
            )}
            {data &&
              data.map((ele) => (
                <Accordion
                  elevation={0}
                  sx={{ border: "1px solid rgba(0,0,0,0.2)", mb: 2 }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography style={{ flex: 1, textAlign: "start" }}>
                      <b>₹{ele.amount}</b>
                    </Typography>
                    <Typography style={{ flex: 1, textAlign: "end" }}>
                      {new Date(ele.createdAt).toLocaleDateString("en-GB")}{" "}
                      {formatAMPM(new Date(ele.createdAt))}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Container>
                      <Typography fontWeight={800}>
                        Order Id: {ele._id}
                      </Typography>
                      <Typography fontWeight={800}>
                        Transaction Id: {ele.transactionId}
                      </Typography>
                    </Container>
                    <List>
                      {ele.items.map((item) => (
                        <ProductItem data={item} />
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ))}
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

export default Orders;
