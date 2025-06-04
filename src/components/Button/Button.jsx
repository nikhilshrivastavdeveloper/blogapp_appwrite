function Button({children, type="", bgColor="bg-blue-600", textColor="text-white", className="", ...props}){
    return(
        <button type={type} className={`${bgColor} ${textColor} ${className} cursor-pointer`} {...props}>{children}</button>
    )
}

export default Button