import { useId, forwardRef } from "react"

const InputBox = forwardRef(({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId()

    return (
        <div className="w-full">
            {
                label && <label className='inline-block mb-1 pl-1' htmlFor={id}>{label}</label>
            }
            <input type={type} id={id} ref={ref} {...props} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} />
        </div>
    )
})

const RadioBox = forwardRef(({ label, className = "", options = [], name, ...props }, ref) => {
    return (
        <div className="w-full flex items-center">
            {
                label && <label className='inline-block mb-1 pl-1'>{label}</label>
            }
            {
                options.length > 0 && options.map((option,index) => (
                    <div key={option}>
                        <input type="radio" name={name} ref={ref} value={option} id={index}  className={`inline-block mx-[10px] mt-[10px] ${className}`} 
                        {...props} />
                        <label htmlFor={index} className='inline-block mb-1 pl-1'>{option}</label>
                    </div>
                ))
            }
        </div>
    )
})

export default InputBox
export {RadioBox}