const Card = ({ name, pokemonId, imageUrl, children }) => {
    return (
        <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
            <figure className="w-full h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                <img
                    src={imageUrl || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
                    alt={name}
                    className="w-full h-full object-contain p-4"
                    loading="lazy"
                />
            </figure>

            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 capitalize text-center">{name}</h2>
                <p className="text-gray-500 text-sm mb-4 text-center">ID: #{pokemonId}</p>
                {children}
            </div>
        </div>
    );
};

export default Card;