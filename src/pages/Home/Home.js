import { Fragment } from "react";
import PresentationSection from "../../components/PresentationSection/PresentationSection";
import Membership from "../../components/Membership/Membership";
import Footer from "../../components/UI/Footer/Footer";

const Home = () => {
  return (
    <Fragment>
      <PresentationSection />
      <Membership />
      <Footer />
    </Fragment>
  );
};

export default Home;
