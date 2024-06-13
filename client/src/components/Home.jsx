import { useEffect, useState } from 'react'
import { Button } from './button';
const Home = ({ home, provider, account, escrow, togglePop }) => {
    const [hasBought, setHasBought] = useState(false);
    const [hasSold, setHasSold] = useState(false);
    const [hasLended, setHasLended] = useState(false);
    const [hasInspected, setHasInspected] = useState(false);

    const [buyer, setBuyer] = useState(null);
    const [lender, setLender] = useState(null);
    const [inspector, setInspector] = useState(null);
    const [seller, setSeller] = useState(null);
    const [owner, setOwner] = useState(null);

    console.log(home.id - 1)

    const fetchDetails = async () => {
        const buyer = await escrow.buyer(home.id)
        setBuyer(buyer)
        const hasBought = await escrow.approval(home.id, buyer)
        setHasBought(hasBought)

        const seller = await escrow.seller()
        setSeller(seller)
        const hasSold = await escrow.approval(home.id, seller);
        setHasSold(hasSold)

        const lender = await escrow.lender()
        setLender(lender)
        const hasLended = await escrow.approval(home.id, lender);
        setHasLended(hasLended)

        const inspector = await escrow.inspector();
        setInspector(inspector)
        const hasInspected = await escrow.inspectionPassed(home.id);
        setHasInspected(hasInspected);
    }

    const fetchOwner = async () => {

        if (await escrow.isListed(home.id)) return
        const owner = await escrow.buyer(home.id)
        console.log(owner)
        setOwner(owner)
        console.log("owner id ", owner)
    }

    const buyHandler = async () => {
        try {
            const escrowAmount = await escrow.escrowAmount(home.id)
            const signer = await provider.getSigner()
            console.log("Buy handler clicked ")
            //Buyer deposit earnest
            let transaction = await escrow.connect(signer).depositEarnest(home.id, { value: escrowAmount })
            await transaction.wait();

            // Buyer approves
            transaction = await escrow.connect(signer).approveSale(home.id)
            await transaction.wait()

            setHasBought(true)
        } catch (e) {
            console.error(e)
        }

    }

    const inspectHandler = async () => {
        try {
            const signer = await provider.getSigner()

            //Inspector updates status
            const trancsaction = await escrow.connect(signer).updateInspectionStatus(home.id, true)
            await trancsaction.wait()

            setHasInspected(true)
        } catch (e) {
            console.error(e)
        }

    }

    const lendHandler = async () => {
        try {
            const signer = await provider.getSigner();

            //Lender approves
            const transaction = await escrow.connect(signer).approveSale(home.id);
            await transaction.wait()

            //lender sends funds to contract 
            const lendAmount = (await escrow.purchasePrice(home.id) - await escrow.escrowAmount(home.id))
            await signer.sendTransaction({ to: escrow.address, value: lendAmount.toString(), gasLimit: 60000 })

            setHasLended(true)
        } catch (e) {
            console.error(e)
        }

    }
    const sellHandler = async () => {
        try {
            const signer = await provider.getSigner()

            //Seller approves
            let transaction = await escrow.connect(signer).approveSale(home.id)
            await transaction.wait();

            //Seller finalize
            transaction = await escrow.connect(signer).finalizeSale(home.id)
            await transaction.wait()

            setHasSold(true)
        } catch (e) {
            console.error(e)
        }

    }

    useEffect(() => {
        fetchDetails();
        fetchOwner();
    }, [hasSold])

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

                {owner ? (<div className='m-[20px_5px] p-4 bg-green-500 text-white border-none rounded-sm font-sans text-[1.10em] font-semibold cursor-pointer transition-all duration-250 ease'>Owned by {owner.slice(0, 6) + '...' + owner.slice(38, 42)}</div>
                ) : (<div>
                    {(account === inspector) ? (
                        <Button clickHandler={inspectHandler} label={"Approve Inspection"} hasFlag={hasInspected} />
                    ) : (account === lender) ? (
                        <Button clickHandler={lendHandler} label={"Approve & lend"} hasFlag={hasLended} />
                    ) : (account === seller) ? (
                        <Button clickHandler={sellHandler} label={"Approve & Sell"} hasFlag={hasSold} />
                    ) : (
                        <div >
                            <Button clickHandler={buyHandler} label={"Buy"} hasFlag={hasBought} />
                        </div>
                    )}
                    <div >
                        <button className="w-36 h-12 bg-transparent text-blue-400 border border-blue-400">
                            Contact agent
                        </button>
                    </div>
                </div>)}


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

export default Home;