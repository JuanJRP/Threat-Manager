interface SelectProps{
    title:string
    option:string
    
}

const Select:React.FC<SelectProps> =({title,option}) =>{
    return(
        <div className="flex flex-col text-xl">
        <label className="font-bold">{title} <span className="text-red-600">*</span></label>

        <select className="w-72 border border-black outline-none">
          <option value="">{option}</option>
          <option value="1">1</option>
        </select>
      </div>
    )

}
export default Select;