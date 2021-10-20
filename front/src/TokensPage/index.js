import React from "react";
import Button from "components/Button";
import PropTypes from "prop-types";
import WithLoader from "components/WithLoader";
import TokensList from "./TokensList";
import { inject, observer } from "mobx-react";
import "./TokensPage.css";

const TokensPage = ({ capFiDiplomaStore: { mintToken, isLoading } }) => {
  this.state = {
      consultant: {
        prenom: '',
        nom: ''
      }
    }

  return (
    <div className="TokensPage">
      <h1>Generate Diploma</h1>
      <form>
        <label>
          Prenom :
          <input
            name="prenom"
            type="text"
            id="prenom"
            />
        </label>
        <label>
          Nom :
          <input
            name="nom"
            type="text"
            id="nom"
            />
        </label>

      <Button onClick={() => mintToken(document.getElementById('prenom').value, document.getElementById('nom').value)} label="Mint token" />
      </form>
      <div className="TokensPage-tokens">
        <WithLoader isLoading={isLoading}>
          <TokensList />
        </WithLoader>
      </div>
    </div>
  );
};

TokensPage.propTypes = {
  capFiDiplomaStore: PropTypes.shape({
    mintToken: PropTypes.func
  }).isRequired
};

export default inject("capFiDiplomaStore")(observer(TokensPage));
