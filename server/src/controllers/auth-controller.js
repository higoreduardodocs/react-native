import { sendVerificationEmail } from '../helpers/email.js'
import UserModel from '../models/user-model.js'

export const save = async (req, res) => {
  const created = new UserModel({ ...req.body })
  created.setVerificationToken()
  await created.save()
  // sendVerificationEmail(created.email, created.verificationToken)

  return res.status(201).json({
    success: true,
    message: 'Cadastro realizado com sucesso, verfique seu e-mail',
  })
}

export const verify = async (req, res) => {
  const finded = await UserModel.findOne({
    verificationToken: req.params.token,
  })
  if (!finded)
    return res
      .status(400)
      .json({ success: false, message: 'Cógido de verificação inválido' })

  finded.verified = true
  finded.verificationToken = undefined
  await finded.save()

  return res
    .status(200)
    .json({ success: true, message: 'Email verificado com sucesso' })
}

export const login = async (req, res) => {
  const { email, password } = req.body
  const finded = await UserModel.findOne({ email })
  if (!finded)
    return res.status(404).json({ success: false, message: 'Usuário inválido' })
  if (finded.password !== password)
    return res
      .status(401)
      .json({ success: false, message: 'Email ou senha inválidos' })

  const token = finded.generateToken()
  return res
    .status(200)
    .json({ success: true, message: 'Login realizado com sucesso', token })
}
