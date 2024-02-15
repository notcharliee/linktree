import { hash } from "bcrypt"

export const bcryptHash = async (data: string): Promise<string> => {
  try {
    return await (hash as (data: string | Buffer, saltOrRounds: string | number) => Promise<string>)(data, 10)
  } catch (error) {
    throw error
  }
}
