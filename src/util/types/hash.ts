import * as bcrypt from 'bcrypt';


     export async function hashPassword(password:string){
        const genSalt = await bcrypt.genSalt(15);
        const hashed = await bcrypt.hash(password,genSalt)
        return hashed
     }

     export async function comparePassword(inputPassword:string, password:string){
         return bcrypt.compare(inputPassword,password)
     }

