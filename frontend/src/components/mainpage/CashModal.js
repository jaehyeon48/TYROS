import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CashModal = ({
  currentPortfolio
}) => {
  return (
    <div>

    </div>
  );
}

CashModal.propTypes = {
  currentPortfolio: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  currentPortfolio: state.portfolio.currentPortfolio
});

export default connect(mapStateToProps, {})(CashModal);
