import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import {
  loadPortfolios,
  createPortfolio,
  editPortfolioName,
  deletePortfolio
} from '../../actions/portfolio';
import './Portfolios.css';

const Portfolios = ({
  portfolios,
  loadPortfolios,
  createPortfolio,
  editPortfolioName,
  deletePortfolio
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [portfolioId, setPortfolioId] = useState('');
  const [portfolioName, setPortfolioName] = useState(''); // for creating portfolio
  const [newPortfolioName, setNewPortfolioName] = useState(''); // for editing portfolio
  const [isCreateFormError, setIsCreateFormError] = useState(false);
  const [isEditFormError, setIsEditFormError] = useState(false);

  useEffect(() => {
    loadPortfolios();
  }, []);

  const handleEditSubmit = event => {
    event.preventDefault();

    if (newPortfolioName.trim() === '') return setIsEditFormError(true);
    else {
      editPortfolioName(portfolioId, newPortfolioName.trim());
      setIsEditModalOpen(false);
      setNewPortfolioName('');
    }
  };

  const handleCreateSubmit = event => {
    event.preventDefault();

    if (portfolioName.trim() === '') return setIsCreateFormError(true);
    else {
      createPortfolio(portfolioName.trim());
      setIsCreateModalOpen(false);
      setPortfolioName('');
    }
  };

  const handleCreateChange = event => setPortfolioName(event.target.value)
  const handleEditChange = event => setNewPortfolioName(event.target.value)

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  }

  const openEditNameModal = id => {
    setIsEditModalOpen(true);
    setPortfolioId(id);
  };

  const handleDeletePortfolio = id => {
    if (window.confirm('You really want to delete the portfolio?')) deletePortfolio(id);
  }

  const closeCreateModal = () => setIsCreateModalOpen(false)
  const closeEditModal = () => setIsEditModalOpen(false)

  return (
    <React.Fragment>
      <div className="portfolios-container">
        <div className="create-portfolio">
          <button className="btn" onClick={() => openCreateModal()}>Create New Portfolio</button>
        </div>
        {portfolios.map(portfolio => (
          <div className="portfolios-item" key={portfolio._id}>
            <div className="portfolios-item__name">{portfolio.name}</div>
            <div className="portfolios-edit-btn" onClick={() => openEditNameModal(portfolio._id)}>EDIT NAME</div>
            <div className="portfolios-delete-btn" onClick={() => handleDeletePortfolio(portfolio._id)}>DELETE</div>
          </div>
        ))}
      </div>
      {isCreateModalOpen ? (
        <div className="modal-create-portfolio">
          <div className="modal-content">
            <i className="fas fa-times" onClick={closeCreateModal}></i>
            <form onSubmit={e => handleCreateSubmit(e)}>
              <div className="form-group">
                <label className={isCreateFormError ? "form-label-error" : "form-label"}>Portfolio Name</label>
                <input
                  className={isCreateFormError ? "form-field form-error" : "form-field"}
                  type="text"
                  name="portfolioName"
                  value={portfolioName}
                  placeholder="Input portfolio name"
                  onChange={e => handleCreateChange(e)}
                />
                {isCreateFormError ? (<small className="form-error-text">Please input portfolio name.</small>) : null}
                <button type="submit" className="btn portfolio-edit-name-btn">CREATE</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
      {isEditModalOpen ? (
        <div className="modal-edit-name" >
          <div className="modal-content">
            <i className="fas fa-times" onClick={closeEditModal}></i>
            <form onSubmit={e => handleEditSubmit(e)}>
              <div className="form-group">
                <label className={isEditFormError ? "form-label-error" : "form-label"}>New Portfolio Name</label>
                <input
                  className={isEditFormError ? "form-field form-error" : "form-field"}
                  type="text"
                  name="newPortfolioName"
                  value={newPortfolioName}
                  placeholder="Input new portfolio name"
                  onChange={e => handleEditChange(e)}
                />
                {isEditFormError ? (<small className="form-error-text">Please input new portfolio name.</small>) : null}
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
  portfolios: PropTypes.array.isRequired,
  createPortfolio: PropTypes.func.isRequired,
  deletePortfolio: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  portfolios: state.portfolio.portfolios
});

export default connect(mapStateToProps, {
  loadPortfolios,
  createPortfolio,
  editPortfolioName,
  deletePortfolio
})(Portfolios);
