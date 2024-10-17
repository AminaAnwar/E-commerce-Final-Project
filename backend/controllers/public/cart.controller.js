const Cart = require("../../models /cart.model")

const addToCart = async (req, res) => {
    const userId = req.user
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [{ productId, quantity }] })
        }
        else {
            let itemIndex = cart.items.findIndex(item => item.productId.toString() === productId)
            if (itemIndex !== -1) {
                cart.items[itemIndex].quantity += quantity;
            }
            else {
                cart.items.push({ productId, quantity })
            }
        }
        await cart.save()
        res.status(200).json({ status: true, message: "Item added to cart", cart });
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })
    }
}

const getCartItems = async (req, res) => {
    const userId = req.user
    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId').lean()
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        const products = cart.items.map(item => ({
            productName: item.productId.title,
            quantity: item.quantity
    }))
        res.status(200).json({ success: true, products });
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })
    }
}

const increaseQuantity = async (req, res) => {
    const userId = req.user
    const { productId } = req.body
    try {
        let cart = await Cart.findOne({ userId });
        let itemIndex = cart.items.findIndex(item => item.productId.toString() === productId)
        cart.items[itemIndex].quantity += 1;
        await cart.save()
        res.status(200).json({ success: true, cart });
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })
    }
}

const decreaseQuantity = async (req, res) => {
    const userId = req.user
    const { productId } = req.body
    try {
        let cart = await Cart.findOne({ userId });
        let itemIndex = cart.items.findIndex(item => item.productId.toString() === productId)
        cart.items[itemIndex].quantity -= 1;
        await cart.save()
        res.status(200).json({ success: true, cart });
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })
    }
}

const removeItem = async(req,res) => {
    const userId = req.user
    const { productId } = req.body
    try {
        let cart = await Cart.findOne({ userId });
        cart.items = cart.items.filter(item => item.productId.toString() !== productId)
        await cart.save()
        res.status(200).json({ success: true, cart });
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })
    }
}

const resetCart = async (req, res) => {
    const userId = req.user
    try {
        await Cart.deleteOne({ userId });
        res.status(200).json({ success: true, message: "Cart Data removed Sucessfully" });
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message })
    }
}




module.exports = { addToCart, getCartItems, increaseQuantity, decreaseQuantity,resetCart,removeItem }