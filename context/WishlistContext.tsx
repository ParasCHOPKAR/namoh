"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type WishlistItem = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type WishlistContextType = {
  wishlist: WishlistItem[];
  addToWishlist: (product: any) => void;
  removeFromWishlist: (id: string) => void;
  toggleWishlist: (product: any) => void;
  isInWishlist: (id: string) => boolean;
  wishlistCount: number;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage when the app starts
  useEffect(() => {
    const savedWishlist = localStorage.getItem("namoh_wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage whenever the wishlist changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("namoh_wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isLoaded]);

  const addToWishlist = (product: any) => {
    setWishlist((prev) => {
      // Prevent adding duplicates
      if (prev.find((item) => item.id === product._id)) return prev;
      
      return [...prev, {
        id: product._id,
        name: product.name,
        price: product.price || 0,
        image: product.image || "https://images.unsplash.com/photo-1584990347449-a6e386927909?q=80&w=600&auto=format&fit=crop",
      }];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleWishlist = (product: any) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product._id);
      
      if (exists) return prev.filter((item) => item.id !== product._id);
      
      return [...prev, {
        id: product._id,
        name: product.name,
        price: product.price || 0,
        image: product.image || "https://images.unsplash.com/photo-1584990347449-a6e386927909?q=80&w=600&auto=format&fit=crop",
      }];
    });
  };

  const isInWishlist = (id: string) => wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider value={{ 
      wishlist, 
      addToWishlist, 
      removeFromWishlist, 
      toggleWishlist, 
      isInWishlist, 
      wishlistCount: wishlist.length 
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

// This is the hook your WishlistPage is trying to import!
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
};