import { compareSync, genSaltSync, hashSync } from "bcrypt";

export const bcrypAdapter = {
    hash: (password: string) => {
        const salt = genSaltSync()
        return hashSync(password, salt)
    },
    compare: (password: string, passwordEncrypted: string) => {
        return compareSync(password, passwordEncrypted)
    }
}