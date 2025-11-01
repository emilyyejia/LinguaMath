import React, { useState } from 'react';
import * as authService from '../../services/authService';
import './DeleteAccountPage.css';

export default function DeleteAccountPage({ user, setUser }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.deleteAccount(password);
      setUser(null);
      window.location.href = '/';
    } catch (err) {
      setError(err.message || 'Failed to delete account');
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="delete-page">
        <div className="delete-card text-center">
          <h2>Please log in to view account settings</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="delete-page">
      <div className="delete-card shadow-lg">
        <h1 className="delete-title text-center mb-4">Account Settings</h1>

        {/* Account Information Section */}
        <div className="account-section mb-5">
          <h3>Account Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Name</label>
              <p>{user.name}</p>
            </div>
            <div className="info-item">
              <label>Email</label>
              <p>{user.email}</p>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="danger-zone">
          {!showConfirm ? (
            <div className="delete-initial d-flex flex-column flex-md-row justify-content-between align-items-center">
              <div className="delete-info mb-3 mb-md-0">
                <h4>Delete Account</h4>
                <p>Once you delete your account, there is no going back. Please be certain.</p>
              </div>
              <button
                onClick={() => setShowConfirm(true)}
                className="delete-btn"
              >
                Delete My Account
              </button>
            </div>
          ) : (
            <div className="delete-confirm">
              <h4 className="warning-title">⚠️ Confirm Account Deletion</h4>
              <p className="warning-text">Are you absolutely sure? This action will:</p>
              <ul className="warning-list">
                <li>Permanently delete your account</li>
                <li>Remove all your posts and data</li>
                <li>Cannot be undone or recovered</li>
              </ul>

              <form onSubmit={handleDelete} className="delete-form">
                <div className="form-group">
                  <label htmlFor="password">Enter your password to confirm:</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Your password"
                    className="password-input"
                  />
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="button-group">
                  <button
                    type="submit"
                    disabled={loading}
                    className="confirm-delete-btn"
                  >
                    {loading ? 'Deleting...' : 'Yes, Delete My Account'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowConfirm(false);
                      setPassword('');
                      setError('');
                    }}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
