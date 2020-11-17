import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/User/RegisterValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const { email, password } = await request.validate(RegisterValidator)

    const user = await User.create({ email, password})

    return response.created(user)
  }
  public async login({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    const token = await auth.use('api').attempt(email, password)
    return token.toJSON()
  }
}
