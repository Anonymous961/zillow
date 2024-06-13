export function Button({ clickHandler, label, hasFlag }) {
    return <button className="my-5 mx-1.25 w-64 p-2 bg-blue-500 text-white border-none rounded font-sans text-[1.10em] font-semibold cursor-pointer transition-all duration-250 ease-in-out" onClick={clickHandler} disabled={hasFlag}>{label}</button>
}