const ModalUsoJusto = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
            <div className="relative bg-gray-800 rounded-xl max-w-md w-full border border-gray-700">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-yellow-400">⚖️ Uso Justo</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
                    </div>
                    <div className="space-y-3 text-sm text-gray-300">
                        <p>
                            Pokémon es propiedad de Nintendo, Game Freak y The Pokémon Company.
                        </p>
                        <p>
                            Este sitio es un proyecto no oficial de fans, sin fines comerciales, 
                            que utiliza contenido bajo el principio de Uso Justo (Fair Use).
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                            © {new Date().getFullYear()} PokéMetric
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalUsoJusto;