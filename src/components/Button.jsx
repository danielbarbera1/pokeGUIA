const Button = ({ id, name, onClick, isSelected, className, customColor, children, ...rest }) => {
  // Si se pasa className personalizado, usarlo. Si no, usar el estilo por defecto
  const defaultClass = `w-32 px-6 py-3 ${customColor || 'bg-blue-600 hover:bg-blue-700'} text-white font-medium rounded-full shadow hover:shadow-md transition-all duration-200 ${isSelected ? 'ring-2 ring-offset-2 ring-blue-300' : ''}`;
  
  return (
    <button
      id={id}
      onClick={onClick}
      className={className || defaultClass}
      {...rest}
    >
      {children || name}
    </button>
  );
};

export default Button;
