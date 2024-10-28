interface InputProps{
    title:string
    placeholder:string
    type?: "text" | "date"
    
}

const Input:React.FC<InputProps> =({title,type,placeholder}) =>{
    return(
        <div className="flex flex-col text-xl">
            <p className="font-bold">
            {title} <span className="text-red-600">*</span>
            </p>
            <input className="bg-transparent outline-none border-b border-black w-72" type={type} placeholder={placeholder} />
        </div>
    )

}
export default Input;