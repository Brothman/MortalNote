import React from 'react';
import Header from './header.jsx';
import MainBanner from './main_banner.jsx';
import PromotionalOffer from './promotional_offer.jsx';
import MotivationalMessage from './motivational_message.jsx';
import PricingBanner from './pricing_banner.jsx';
import HowItWorks from './how_it_works.jsx';
import PopularFeatures from './popular_features.jsx';
import LandingSignUpForm from './landing_signup_form.jsx';
import Footer from './footer.jsx';
//perhaps connect to the store to see if we're logged in
class LandingPage extends React.Component {
  render () {
    return (
      <div className="landing-page">
        <Header />
        <MainBanner />
        <Footer />
      </div>
    );
  }
}



export default LandingPage;
