import UserModel from '../models/user-model.js'
import OrderModel from '../models/order-model.js'

export const addOrder = async (req, res) => {
  // const { userId, cartItems, totalPrice, shippingAddress, paymentMethod }
  const { userId, cartItems, ...rest } = req.body

  const findedUser = await UserModel.findById(userId)
  if (!findedUser)
    return res.status(404).json({ success: false, message: 'Usuário inválido' })

  const products = cartItems.map((item) => ({
    name: item?.title,
    quantity: item.quantity,
    price: item.price,
    image: item?.image,
  }))
  const order = new OrderModel({
    user: findedUser,
    products,
    ...rest,
  })
  await order.save()

  return res
    .status(200)
    .json({ success: true, message: 'Pedido criado com sucesso' })
}

export const orders = async (req, res) => {
  const orders = await OrderModel.find({ user: req.params.userId }).populate(
    'user'
  )
  if (!orders || orders?.length === 0)
    return res.status(200).json({
      success: true,
      message: 'Nenhum pedido encontrado para este usuário',
    })

  return res.status(200).json(orders)
}
