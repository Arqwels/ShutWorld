import '../index.scss';
const WrapperComponent = ({ children }) => {
  return (
    <div className="container">
      {children}
    </div>
  );
};

export default WrapperComponent;