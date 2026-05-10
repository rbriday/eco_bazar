let emptyFieldValidation = (res, ...fields)=>{
    if(fields.includes(" ") || fields.includes(undefined)){
        return res.status(400).json({message : "Please fill the all field"})
    }
//  if (!email || !password || !confirmPassword) {
//         return res.status(400).json({
//             message: "Please fill the all field"
//         })
//     }
}

module.exports = {emptyFieldValidation}