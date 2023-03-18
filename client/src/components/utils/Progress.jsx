import React, { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import RectangleIcon from "@mui/icons-material/Rectangle";
import RectangleOutlinedIcon from "@mui/icons-material/RectangleOutlined";
import { grey } from "@mui/material/colors";

const StyledRating = styled(Rating)({});

// const labels = {
//   1: "25%",
//   2: "50%",
//   3: "75%",
//   4: "100%",
//   5: "wow!",
// };

// function getLabelText(value) {
//   return `${value}, ${labels[value]}`;
// }

export default function Progress({ ratingcolor, rate, handleRate }) {
  // eslint-disable-next-line
  const [hover, setHover] = useState(-1);

  return (
    <Box
      sx={{
        width: "auto",
        display: "flex",
        alignItems: "center",
      }}
    >
      <StyledRating
        sx={ratingcolor}
        name="hover-feedback"
        value={rate}
        precision={1}
        // getLabelText={getLabelText}
        onChange={handleRate}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        icon={<RectangleIcon fontSize="inherit" />}
        emptyIcon={
          <RectangleOutlinedIcon fontSize="inherit" sx={{ color: grey[400] }} />
        }
      />
      {/* {rate !== null && (
        <Box sx={{ ml: 1 }}>{labels[hover !== -1 ? hover : rate]}</Box>
      )} */}
    </Box>
  );
}

Progress.propTypes = {
  ratingcolor: PropTypes.object.isRequired,
  rate: PropTypes.number.isRequired,
  handleRate: PropTypes.func.isRequired,
};
