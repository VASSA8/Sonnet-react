import Banner from './Banner/Banner.tsx';
import Category from './Category/Category.tsx';
import './body-home.css';

const BodyHome = () => {
  return (
    <div className="body-home">
      <Banner />
      <Category />
    </div>
  );
};

export default BodyHome;