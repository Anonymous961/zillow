import PropTypes from 'prop-types'
const Home = ({ home, provider, escrow, togglePop }) => {
    return (<div className="w-screen h-screen fixed bg-black bg-opacity-70 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="grid grid-cols-5 items-center w-4/5 h-4/5 pl-5 py-5 mx-auto  fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white">

            <div className="max-w-md col-span-2 m-5 mx-auto">
                <img src={home.image} className="w-full" alt="" />
            </div>
            <div className="h-full col-span-3 ml-5 pr-10 overflow-y-scroll">
                <h1 className="text-2xl font-bold">{home.name}</h1>
                <p>
                    <strong>{home.attributes[2].value}</strong> bds |
                    <strong>{home.attributes[3].value}</strong> ba |
                    <strong>{home.attributes[4].value}</strong> sqft
                </p>
                <p>{home.address}</p>
                <h4 className="font-bold text-xl">{home.attributes[0].value} ETH</h4>
                <div >
                    <button className="my-5 mx-1.25 w-64 p-2 bg-blue-500 text-white border-none rounded font-sans text-[1.10em] font-semibold cursor-pointer transition-all duration-250 ease-in-out">Buy</button>
                </div>
                <button className="w-36 h-12 bg-transparent text-blue-400 border border-blue-400">
                    Contact agent
                </button>
                <hr />
                <h2 className="font-bold text-xl">Overview</h2>
                <p>
                    {home.description}
                </p>
                <hr />
                <h2 className="font-bold text-xl">Facts and features</h2>
                <ul>
                    {home.attributes.map((attribute, index) => (

                        <li key={index}><strong>{attribute.trait_type}</strong>:{attribute.value}</li>
                    ))}
                </ul>
                <button onClick={togglePop} className="absolute top-2.5 right-2.5 w-8 h-8 bg-transparent cursor-pointer"><img src="https://i.postimg.cc/rmp2F1ry/close.png" alt="" className="h-6 w-6 hover:scale-125 " /></button>
            </div>
        </div>
    </div>);
}

Home.propTypes = {
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
export default Home;