"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ShoppingCart, Heart, ArrowLeft, Truck, ShieldCheck, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id;

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetching from your existing products API
        const res = await fetch("/api/products");
        const data = await res.json();
        
        if (data.success) {
          // Find the specific product that matches the URL ID
          const foundProduct = data.products.find((p: any) => p._id === productId);
          setProduct(foundProduct);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#f8f9fa] gap-4">
        <Loader2 size={48} className="animate-spin text-[#c69c4e]" />
        <p className="text-[#0f1b2e] font-bold tracking-widest uppercase">Loading Product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#f8f9fa] gap-4">
        <h1 className="text-3xl font-bold text-[#0f1b2e]">Product Not Found</h1>
        <p className="text-zinc-500">The item you are looking for does not exist or has been removed.</p>
        <button onClick={() => router.push('/category')} className="mt-4 bg-[#c69c4e] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#b0883d] transition-colors">
          Return to Catalog
        </button>
      </div>
    );
  }

  // Handle Add to Cart with selected quantity
  const handleAddToCart = () => {
    // Add the item to cart 'quantity' times, or update your context to accept bulk quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    // Provide brief visual feedback or redirect
    router.push('/cart');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24">
      {/* Top Breadcrumb Bar */}
      <div className="bg-white border-b border-zinc-200 py-4 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto flex items-center gap-2 text-sm font-medium text-zinc-500">
          <button onClick={() => router.back()} className="hover:text-[#c69c4e] flex items-center gap-1 transition-colors">
            <ArrowLeft size={16} /> Back
          </button>
          <span>/</span>
          <Link href="/category" className="hover:text-[#c69c4e] transition-colors">Catalog</Link>
          <span>/</span>
          <span className="text-[#0f1b2e] truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 mt-8 lg:mt-12">
        <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 overflow-hidden flex flex-col md:flex-row">
          
          {/* LEFT: Product Image */}
          <div className="w-full md:w-1/2 p-8 lg:p-12 bg-zinc-50 flex items-center justify-center relative border-r border-zinc-100">
            <div className="relative w-full aspect-square max-w-[400px]">
              <Image 
                src={
                  product.image && 
                  (product.image.startsWith('http://') || product.image.startsWith('https://')) && 
                  !product.image.includes('google.com/imgres')
                    ? product.image 
                    : "https://images.unsplash.com/photo-1584990347449-a6e386927909?q=80&w=600&auto=format&fit=crop"
                }
                alt={product.name}
                fill
                className="object-contain"
                unoptimized={product.image?.includes('kommodo.ai') || product.image?.includes('5.imimg.com')}
              />
            </div>
            
            {/* Wishlist Floating Button */}
            <button 
              onClick={() => toggleWishlist(product)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors bg-white hover:bg-red-50 text-zinc-400 hover:text-red-500"
              title={isInWishlist(product._id) ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart size={24} className={isInWishlist(product._id) ? "fill-red-500 text-red-500" : ""} />
            </button>
          </div>

          {/* RIGHT: Product Details */}
          <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col">
            
            {product.subCategory && (
              <p className="text-[#c69c4e] font-bold tracking-widest uppercase text-sm mb-2">
                {product.subCategory}
              </p>
            )}
            
            <h1 className="text-3xl lg:text-4xl font-extrabold text-[#0f1b2e] mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="text-3xl font-extrabold text-[#0f1b2e] mb-6">
              ₹{(product.price || 0).toLocaleString()}
            </div>

            <div className="w-full h-px bg-zinc-100 mb-6"></div>

            <p className="text-zinc-600 leading-relaxed mb-8">
              {product.description || "Premium quality HORECA supply designed for professional kitchens, hotels, and restaurants. Built to last with commercial-grade materials."}
            </p>

            <div className="mt-auto space-y-6">
              
              {/* Quantity Selector */}
              <div>
                <p className="text-sm font-bold text-[#0f1b2e] mb-3">Quantity</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-xl p-1 w-32">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-[#0f1b2e] hover:bg-zinc-200 rounded-lg transition-colors">
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-[#0f1b2e]">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-[#0f1b2e] hover:bg-zinc-200 rounded-lg transition-colors">
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#0f1b2e] text-white py-4 rounded-xl font-bold hover:bg-[#1a2b47] transition-all hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} /> Add to Cart
                </button>
                <button 
                  onClick={() => router.push('/checkout')}
                  className="flex-1 bg-[#c69c4e] text-white py-4 rounded-xl font-bold hover:bg-[#b0883d] transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  Buy it Now
                </button>
              </div>
    
              {/* Trust Badges */}
              <div className="flex items-center gap-6 pt-6 border-t border-zinc-100">
                <div className="flex items-center gap-2 text-sm font-medium text-zinc-600">
                  <Truck size={18} className="text-[#c69c4e]" /> Fast Delivery
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-zinc-600">
                  <ShieldCheck size={18} className="text-[#c69c4e]" /> Secure Payment
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}