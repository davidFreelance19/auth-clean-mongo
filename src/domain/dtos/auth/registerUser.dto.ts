import { bcrypAdapter } from '../../../adapters/bcrypt.adapter';
export class RegisterUserDto {

    private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string
    ) { }

    static register(object: { [key: string]: any }): [string?, RegisterUserDto?] {
        const { email, password, name } = object
        if (!name) return ["Name is required", undefined]
        if (!email) return ["Email is required", undefined]
        if (!password) return ["Password is required", undefined]
        if (password.length < 6) return ["Password must be at least 6 characters", undefined]
        return [undefined, new RegisterUserDto(name, email, password)]
    }
}