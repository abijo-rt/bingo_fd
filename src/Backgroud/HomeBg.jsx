
const HomeBg = () => {

    return(
        <>
        <div className="absolute inset-0 flex justify-center items-center -z-10">
             <div className="absolute size-52 bg-green-500 rounded-full blur-[100px] opacity-70 left-20 top-20"></div>
             <div className="absolute size-68 bg-red-400 rounded-full blur-3xl opacity-50 right-40 top-1/4"></div>
             <div className="absolute size-40 bg-blue-300 rounded-full blur-3xl opacity-50 left-1/3 bottom-1/3"></div>
             <div className="absolute size-44 bg-yellow-500 rounded-full blur-3xl opacity-50 right-1/4 bottom-10"></div>
        </div>
        </>
    )
}

export default HomeBg;