import jsonwebtoken from "jsonwebtoken";
interface JwtPayload {
    companyId: string;
  }

export const assignToken = (payload: any)=>{
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET_KEY as string)
}
export const verifyToken = (token: any): JwtPayload=>{
  const decoded =  jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY as string)

  return decoded as JwtPayload
}