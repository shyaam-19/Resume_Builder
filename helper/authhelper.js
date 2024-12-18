import bcrypt from 'bcrypt'

export const hashPassword = async (password)=>{
    try{
        const hasedPassword = await bcrypt.hash(password,10);
        return hasedPassword;
    }catch(error){
        console.log(error);
    }
}

export const comparePassword = async(password,hasedPassword)=>{
    try{
        return await bcrypt.compare(password,hasedPassword);
    }catch (error) {
        console.log(error);
    }
}

export const validPassword  = (password)=>{
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);  // \d is equivalent to [0-9]
    
    return hasLowercase && hasUppercase && hasNumbers;
}


