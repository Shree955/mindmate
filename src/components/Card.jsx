const Card = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-white p-10 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card