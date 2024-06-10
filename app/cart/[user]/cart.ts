'use server';
import { kv } from "@vercel/kv";


export async function getCart() {
    const cart = await kv.get<{ id: string; quantity: number }[]>("aa");
    return cart;
}

export async function setCart(cart: any) {
    await kv.set("aa", cart);
}