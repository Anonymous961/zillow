import PropTypes from 'prop-types'
const Card = ({ home, toggleProp }) => {
    return (<div className="max-w-xs max-h-sm rounded overflow-hidden shadow-lg hover:shadow-2xl" onClick={() => toggleProp(home)}>
        <img className="w-full" src={home.image} alt="Sunset in the mountains" />
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{home.name}</div>
            <p className="text-gray-700 text-base">
                {home.description}
            </p>
            <div>

                <h4>{home.attributes[0].value} ETH</h4>
                <p>
                    <strong>{home.attributes[2].value}</strong> bds |
                    <strong>{home.attributes[3].value}</strong> ba |
                    <strong>{home.attributes[4].value}</strong> sqft
                </p>
                <h4>{home.address}</h4>
            </div>
        </div>
    </div>);
}

Card.propTypes = {
    home: PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        attributes: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
            })
        ).isRequired,
        address: PropTypes.string.isRequired,
    }).isRequired,
    toggleProp: () => { }
}

export default Card;