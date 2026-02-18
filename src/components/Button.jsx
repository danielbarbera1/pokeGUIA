const Button = ({ id, name, onClick, isSelected, ...rest }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      {...rest}
      className={`w-32 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full shadow hover:shadow-md transition-all duration-200 ${isSelected ? 'ring-2 ring-offset-2 ring-blue-300' : ''}`} 
    >
      {name}
    </button>
  );
};

export default Button;
