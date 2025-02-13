import bcrypt from 'bcrypt'

export const hashpassword=async(password)=>{
    try{
        const hashedpassword=await bcrypt.hash(password,10)
        return hashedpassword;
    }
    catch(error){
        console.log(error)
    }
}

export const comparepassword=async(password,hashedpassword)=>{
    return bcrypt.compare(password,hashedpassword);
}