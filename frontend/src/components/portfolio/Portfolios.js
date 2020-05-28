import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import {
  loadPortfolios,
  editPortfolioName
} from '../../actions/portfolio';
import './Portfolios.css';

const Portfolios = ({
  portfolios,
  loadPortfolios,
  editPortfolioName
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [portfolioId, setPortfolioId] = useState('');
  const [newPortfolioName, setNewPortfolioName] = useState('');
  const [isFormError, setIsFormError] = useState(false);

  useEffect(() => {
    loadPortfolios();
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    if (newPortfolioName.trim() === '') return setIsFormError(true);
    else {
      editPortfolioName(portfolioId, newPortfolioName.trim());
      setIsModalOpen(false);
      setNewPortfolioName('');
    }
  };

  const handleChange = event => setNewPortfolioName(event.target.value)

  const openEditNameModal = id => {
    setIsModalOpen(true);
    setPortfolioId(id);
  }

  const closeEditModal = () => setIsModalOpen(false)

  return (
    <React.Fragment>
      <div className="portfolios-container">
        {portfolios.map(portfolio => (
          <div className="portfolios-item" key={portfolio._id}>
            <div className="portfolios-item__name">{portfolio.name}</div>
            <div className="portfolios-edit-btn" onClick={() => openEditNameModal(portfolio._id)}>EDIT NAME</div>
            <div className="portfolios-delete-btn">DELETE</div>
          </div>
        ))}
      </div>
      {isModalOpen ? (
        <div className="modal-edit-name" >
          <div className="modal-content">
            <i className="fas fa-times" onClick={closeEditModal}></i>
            <form onSubmit={e => handleSubmit(e)}>
              <div className="form-group">
                <label className={isFormError ? "form-label-error" : "form-label"}>New Portfolio Name</label>
                <input
                  className={isFormError ? "form-field form-error" : "form-field"}
                  type="text"
                  name="newPortfolioName"
                  value={newPortfolioName}
                  placeholder="Input new portfolio name"
                  onChange={e => handleChange(e)}
                />
                {isFormError ? (<small className="form-error-text">Please input new portfolio name.</small>) : null}
                <button type="submit" className="btn portfolio-edit-name-btn">EDIT</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}

Portfolios.propTypes = {
  loadPortfolios: PropTypes.func.isRequired,
  editPortfolioName: PropTypes.func.isRequired,
  portfolios: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  portfolios: state.portfolio.portfolios
});

export default connect(mapStateToProps, {
  loadPortfolios,
  editPortfolioName
})(Portfolios);
