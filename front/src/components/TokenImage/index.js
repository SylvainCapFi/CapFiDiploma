import React from "react";
import PropTypes from "prop-types";
import diplome from './diplome.png';
import "./TokenImage.css";

const IMAGE_SIZE = 10;

const TokenImage = ({ outer, inner, size }) => {
  const gradId = `${outer}${inner}`.replace(/#/g, "");
  const imageSize = size || IMAGE_SIZE;
  return (
      <div>
   <div>
     <img src={diplome} alt="Diplome" />
   </div>
   <div class="centered">
      Sylvain Faucon
    </div>
</div>

  );
};

TokenImage.propTypes = {
  outer: PropTypes.string.isRequired,
  inner: PropTypes.string.isRequired,
  size: PropTypes.number
};

export default TokenImage;
