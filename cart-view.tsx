"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, Check, CreditCard } from "lucide-react"
import { useCart } from "@/lib/cart-store"
import { ShopHeader } from "./shop-header"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU").format(price) + " \u20B8"
}

const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
  city: z.string().min(2, "City is required"),
  zipCode: z.string().min(4, "Valid ZIP code is required"),
  cardNumber: z.string().min(16, "Card number must be 16 digits").max(19, "Card number too long"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Invalid expiry date (MM/YY)"),
  cvv: z.string().length(3, "CVV must be 3 digits"),
})

type CheckoutFormValues = z.infer<typeof checkoutSchema>

export function CartView() {
  const { items, remove, update, clear, total, count } = useCart()
  const [checkoutDone, setCheckoutDone] = useState(false)
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  })

  function onSubmit(data: CheckoutFormValues) {
    // In a real app, you would send data to backend here
    console.log(data)
    setCheckoutDone(true)
    clear()
    window.scrollTo(0, 0)
  }

  if (checkoutDone) {
    return (
      <div className="min-h-screen">
        <ShopHeader showSearch={false} />
        <main className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-6 px-4 py-20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Order confirmed!</h1>
          Thank you for your purchase. Your education journey with Nateya starts now.
          <Link
            href="/"
            className="rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Continue browsing programs
          </Link>
        </main>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <ShopHeader showSearch={false} />
        <main className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-6 px-4 py-20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Your cart is empty</h1>
          Looks like you haven&apos;t added any programs yet.
          <Link
            href="/"
            className="rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Browse programs
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <ShopHeader showSearch={false} />

      <main className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
        <button
          onClick={() => {
            if (showCheckoutForm) setShowCheckoutForm(false)
            else window.location.href = "/"
          }}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {showCheckoutForm ? "Back to cart" : "Continue browsing"}
        </button>

        <h1 className="mb-8 text-2xl font-bold text-foreground lg:text-3xl">
          {showCheckoutForm ? "Checkout" : `Shopping Cart (${count} ${count === 1 ? "item" : "items"})`}
        </h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main Content: Cart Items or Checkout Form */}
          <div className="space-y-4">
            {!showCheckoutForm ? (
              // Cart Items List
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 rounded-xl border bg-card p-4"
                >
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted sm:h-28 sm:w-28">
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {item.product.brand}
                      </p>
                      <h3 className="font-semibold text-foreground">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            update(item.product.id, item.size, item.quantity - 1)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg border bg-card text-foreground transition-colors hover:bg-muted"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            update(item.product.id, item.size, item.quantity + 1)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg border bg-card text-foreground transition-colors hover:bg-muted"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-bold text-foreground">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => remove(item.product.id, item.size)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Checkout Form
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="rounded-xl border bg-card p-6 space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      Shipping Information
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="New York" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input placeholder="10001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border bg-card p-6 space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Details
                    </h3>
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Number</FormLabel>
                          <FormControl>
                            <Input placeholder="0000 0000 0000 0000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="expiryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                              <Input placeholder="MM/YY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cvv"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVV</FormLabel>
                            <FormControl>
                              <Input placeholder="123" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-12 text-base" size="lg">
                    Place Order ({formatPrice(total)})
                  </Button>
                </form>
              </Form>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-xl border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Order Summary</h2>
              <div className="space-y-3 border-b pb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">{formatPrice(total)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">Free</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-foreground">Total</span>
                <span className="text-lg font-bold text-foreground">{formatPrice(total)}</span>
              </div>
              {!showCheckoutForm && (
                <Button
                  onClick={() => setShowCheckoutForm(true)}
                  className="mt-6 w-full"
                  size="lg"
                >
                  Checkout
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
