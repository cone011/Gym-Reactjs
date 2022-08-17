import { Fragment } from "react";
import PresentationSection from "../../components/PresentationSection/PresentationSection";
import Membership from "../../components/Membership/Membership";

const Home = () => {
  return (
    <Fragment>
      <PresentationSection />
      <Membership />
    </Fragment>
  );
};

export default Home;
