import connectDB from "@/lib/connectdb";
import { NextResponse } from "next/server";
import Cart from "@/lib/model/cart";

// Add to Cart
export async function POST(req) {
  try {
    await connectDB();
    const { userId, productId, quantity = 1 } = await req.json();

    if (!userId || !productId) {
      return NextResponse.json({ message: "userId and productId are required. You might need to log out and log back in." }, { status: 400 });
    }

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      // Check if product already in cart
      const itemIndex = cart.products.findIndex((p) => p.product && p.product.toString() === productId);

      if (itemIndex > -1) {
        // Product exists in cart, update quantity
        cart.products[itemIndex].quantity += quantity;
      } else {
        // Product not in cart, add it
        cart.products.push({ product: productId, quantity });
      }
      await cart.save();
    } else {
      // Create new cart
      cart = await Cart.create({
        user: userId,
        products: [{ product: productId, quantity }],
      });
    }

    const populatedCart = await Cart.findById(cart._id).populate("products.product");
    return NextResponse.json(populatedCart, { status: 200, message: "Added to cart" });

  } catch (error) {
    console.error("ADD TO CART ERROR: ", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// Remove/Update Cart Item
export async function PUT(req) {
  try {
    await connectDB();
    const { userId, productId, action } = await req.json(); 
    // action can be "increment", "decrement", "remove"

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return NextResponse.json({ message: "Cart not found" }, { status: 404 });

    const itemIndex = cart.products.findIndex((p) => p.product.toString() === productId);

    if (itemIndex > -1) {
      if (action === "increment") {
        cart.products[itemIndex].quantity += 1;
      } else if (action === "decrement") {
        cart.products[itemIndex].quantity -= 1;
        if (cart.products[itemIndex].quantity <= 0) {
          cart.products.splice(itemIndex, 1);
        }
      } else if (action === "remove") {
        cart.products.splice(itemIndex, 1);
      }
      await cart.save();
    }

    const populatedCart = await Cart.findById(cart._id).populate("products.product");
    return NextResponse.json(populatedCart, { status: 200, message: "Cart updated" });

  } catch (error) {
    console.error("UPDATE CART ERROR: ", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
