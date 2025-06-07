function Button({children, type="", bgColor="bg-blue-600", className="", ...props}){
    return(
        <button type={type} className={`${bgColor} ${className} cursor-pointer`} {...props}>{children}</button>
    )
}

export default Button