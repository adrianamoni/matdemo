import { CircularProgress, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import UseFetchData from "./customHooks/UseFetchData";

const FetchData = () => {
  const { data, loading, error } = UseFetchData(
    "https://jsonplaceholder.typicode.com/todos"
  );

  if (error) {
    console.log(error);
  }
  console.log("data", data);
  return loading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  ) : (
    data && (
      <div>
        {data.map((item) => (
          <div>{item.title}</div>
        ))}
      </div>
    )
  );
};

export default FetchData;
