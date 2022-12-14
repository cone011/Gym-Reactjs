import classes from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={classes.footerContainer}>
      <section className={classes.footerSubscription}>
        <p className={classes.footerSubscriptionHeading}>
          Join the Adventure newsletter to receive our best sport deals
        </p>
        <p className={classes.footerSubscriptionText}>
          You can unsubscribe at any time.
        </p>
      </section>
      <div className={classes.footerLinks}>
        <div className={classes.footerLinkWrapper}>
          <div className={classes.footerLinkItems}>
            <h2>About Us</h2>
            <Link to="/sign-up">How it works</Link>
            <Link to="/">Careers</Link>
            <Link to="/">Investors</Link>
            <Link to="/">Terms of Service</Link>
          </div>
          <div className={classes.footerLinkItems}>
            <h2>Contact Us</h2>
            <Link to="/">Contact</Link>
            <Link to="/">Support</Link>
            <Link to="/">Sponsorships</Link>
          </div>
        </div>
        <div className={classes.footerLinkWrapper}>
          <div className={classes.footerLinkItems}>
            <h2>Videos</h2>
            <Link to="/">Submit Video</Link>
            <Link to="/">Agency</Link>
            <Link to="/">Influencer</Link>
          </div>
          <div className={classes.footerLinkItems}>
            <h2>Social Media</h2>
            <Link to="/">Instagram</Link>
            <Link to="/">Facebook</Link>
            <Link to="/">Youtube</Link>
            <Link to="/">Twitter</Link>
          </div>
        </div>
      </div>
      <section className={classes.socialMedia}>
        <div className={classes.socialMediaWrap}>
          <div className="footer-logo">
            <Link to="/" className={classes.socialLogo}>
              <i className="fas fa-dumbbell"></i>GYM
            </Link>
          </div>
          <small className="website-rights">GYM © 2020</small>
          <div className={classes.socialIcons}>
            <Link
              className="social-icon-link facebook"
              to="/"
              target="_blank"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f" />
            </Link>
            <Link
              className="social-icon-link instagram"
              to="/"
              target="_blank"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram" />
            </Link>
            <Link
              className="social-icon-link youtube"
              to="/"
              target="_blank"
              aria-label="Youtube"
            >
              <i className="fab fa-youtube" />
            </Link>
            <Link
              className="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter" />
            </Link>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
