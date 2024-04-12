import UserModel from '../models/user-model.js'

export const addAddress = async (req, res) => {
  const finded = await UserModel.findById(req.body.id)
  if (!finded)
    return res.status(404).json({ success: false, message: 'Usuário inválido' })

  finded.addresses.push(req.body.address)
  await finded.save()

  return res
    .status(200)
    .json({ success: true, message: 'Endereço adicionado com sucesso' })
}

export const addresses = async (req, res) => {
  const finded = await UserModel.findById(req.params.id)
  if (!finded)
    return res.status(404).json({ success: false, message: 'Usuário inválido' })

  return res.status(200).json({ success: true, addresses: finded.addresses })
}

export const getProfile = async (req, res) => {
  const finded = await UserModel.findById(req.params.id)
  if (!finded)
    return res.status(404).json({ success: false, message: 'Usuário inválido' })

  return res.status(200).json(finded)
}
