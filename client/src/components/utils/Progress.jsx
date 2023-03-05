import * as React from "react";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import RectangleIcon from "@mui/icons-material/Rectangle";
import RectangleOutlinedIcon from "@mui/icons-material/RectangleOutlined";
import { grey } from "@mui/material/colors";

const StyledRating = styled(Rating)({});

const labels = {
  1: "25%",
  2: "50%",
  3: "75%",
  4: "100%",
  5: "wow!",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function Progress(props) {
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <StyledRating
        sx={props.ratingcolor}
        name="hover-feedback"
        value={value}
        precision={1}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        icon={<RectangleIcon fontSize="inherit" />}
        emptyIcon={
          <RectangleOutlinedIcon fontSize="inherit" sx={{ color: grey[800] }} />
        }
      />
      {value !== null && (
        <Box sx={{ ml: 1 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}