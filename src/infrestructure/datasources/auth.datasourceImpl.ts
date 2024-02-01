import { UserModel } from './../../data/mongo/models/user.model';
import { AuthDataSource } from "../../domain/datasources";
import { RegisterUserDto } from "../../domain/dtos";
import { MailContent, UserEntity } from "../../domain/entities";
import { bcrypAdapter, emailContent, transport } from '../../adapters';
import { JwtAdapter } from '../../adapters/jwt.adapter';


export class AuthDatasourceImpl implements AuthDataSource {

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const userExist = await UserModel.findOne({ email: registerUserDto.email })
        if (userExist) throw `User already exists with email ${registerUserDto.email}`

        const passwordHash = bcrypAdapter.hash(registerUserDto.password)
        const user = new UserModel({ ...registerUserDto, password: passwordHash })

        user.save();

        const token = await JwtAdapter.generateToken({ email: user.email })
        const content = emailContent.verifyUser(user.email, token as string)

        await this.sendEmail(content)
        
        return UserEntity.fromObject(user);
    }


    async verifyUser(token: string): Promise<UserEntity> {
        const payload = await JwtAdapter.validateToken<{ email: string }>(token)

        if (!payload) throw "Invalid token"

        const userExist = await UserModel.findOne({ email: payload.email })
        if (!userExist) throw "Internal server error"

        userExist.emailVerified = true;
        userExist.save()

        return UserEntity.fromObject(userExist);
    }

    async login(email: string, password: string): Promise<{ user: UserEntity; token: string; }> {
        const userExist = await UserModel.findOne({ email })
        if (!userExist) throw `User not exist with email ${email}`

        if (!userExist.emailVerified) throw "User not verified"

        if (!bcrypAdapter.compare(password, userExist.password)) throw "Password incorrect"

        const token = await JwtAdapter.generateToken({ email: userExist.email }, "24h") as string
        const user = UserEntity.fromObject(userExist);

        return { user, token }
    }

    async sendEmail(content: MailContent): Promise<void> {
        try {
            await transport.sendMail(content)
        } catch (error) {
            throw "Error sending email"
        }
    }

}