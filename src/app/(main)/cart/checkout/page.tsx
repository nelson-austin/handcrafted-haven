import CheckForm from "./CheckForm"

export default function CheckPage() {
    
    return ( 
        <div className="pl-3 pr-3 overflow-y-clip">
            <div className="flex flex-col rounded-xl items-left justify-left p-3 bg-blue-100 mt-5">
                <div className="md:flex md:justify-center">
                    <div className="block bg-gray-50  rounded-xl overflow-hidden shadow-lg mx-4 my-4 p-5 md:min-w-[30rem] md:max-w-[30rem]">
                        <h2 className="pl-[20px] text-[2rem] font-semibold text-gray-800 flex justify-center">Review Your Order</h2>
                        <section className="p-[0.5rem]">
                        <CheckForm/>
                        </section>
                    </div>
                </div>
            </div>
        </div>
 )}