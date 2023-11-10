import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Icon from '@mdi/react';
import { mdiPlusCircle } from '@mdi/js';
import { mdiMinusCircle } from '@mdi/js';
import { mdiStarCircle } from '@mdi/js';
import { mdiFacebook } from '@mdi/js';
import { mdiPinterest } from '@mdi/js';
import { mdiLinkedin } from '@mdi/js';
import { mdiGooglePlus } from '@mdi/js';
import './css/HomePage.css';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

function HomePage() {
  return (
    <div className="homepage">
      <nav>
        <div className="nav-content">
          <div>
            <Link to="/" className="nav-logo">
              AMI
            </Link>
          </div>
          <div className='breadcrumb-section'>
            <Breadcrumbs aria-label="breadcrumb">
              <StyledBreadcrumb component={Link} to="/login" label="Login" />
            </Breadcrumbs>
            <Breadcrumbs aria-label="breadcrumb">
              <StyledBreadcrumb component={Link} to="/register" label="Register" />
            </Breadcrumbs>
          </div>
        </div>
      </nav>
      <header className="hero-section">
        <h1 className="first-heading">Welcome to</h1>
        <h1 className="second-heading">Asset Management System</h1>
        <p>Efficiently Track and Manage Your Organization's Assets</p>
      </header>
      <main className="main">
        <section className="project-description">
          <div className="adding-request">
            <Icon path={mdiPlusCircle} size={2} />
            <p>Our system enables a user to add assets according to the specific rights they have in the organization</p>
          </div>
          <div className='remove-request'>
            <Icon path={mdiMinusCircle} size={2} />
            <p>Our system also enables a user to delete an asset according to the rights that the user has in a company</p>
          </div>
          <div className='user-section'>
            <Icon path={mdiStarCircle} size={2} />
            <p>Our System also allows addition of users to the system and removal of users to the system</p>
          </div>
        </section>
        <section className="asset-request-section">
        
        </section>
        <section className="contact-section">
          <div className="contact-info">
            <h2>Say Hi & Get in Touch</h2>
            <p>
              <Icon path={mdiFacebook} size={2} />
              <Icon path={mdiPinterest} size={2} />
              <Icon path={mdiLinkedin} size={2} />
              <Icon path={mdiGooglePlus} size={2} />
            </p>
            <div className="contact-section-icons">
              <p></p>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div></div>
        <p>&copy; 2023 AMI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;