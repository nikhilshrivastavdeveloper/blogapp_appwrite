import { useId, forwardRef } from "react"

// function InputBox({ label, type = "text", className = "", reference, ...props }) {
//     const id = useId()

//     return (
//         <div className="w-full">
//             {
//                 label && <label className='inline-block mb-1 pl-1' htmlFor={id}>{label}</label>
//             }
//             <input type={type} id={id} ref={reference} {...props} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} />
//         </div>
//     )
// }

const InputBox = forwardRef(({label, type="text", className="", ...props }, ref) => {
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

export default InputBox
/*
forwardRef 
example :- <child ref={reference} />
ref keyword only work on html element get reference of html element

we can use it only html element not on functional component but if we want to use it on functional component like this show in example above so we use forwardRef() function in child component that forward parent component reference to html element of child component 
*/
