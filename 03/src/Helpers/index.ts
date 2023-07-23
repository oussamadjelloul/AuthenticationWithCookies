import crypto from 'crypto';

const SECRET = 'OUSSAMADJELLOUL-API-PROJECT';
export const random = () => crypto.randomBytes(128).toString('base64');

export const authentification =(salt:string ,passowrd : string )=>{
    return crypto.createHmac('sha256',[salt,passowrd].join('/')).update(SECRET).digest('hex');
}



