"use client";

import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Input from "@/components/input";
import Button from "@/components/button";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const onImageChange = () => {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 flex items-center justify-center px-4">
      <form
        className="w-full max-w-md bg-neutral-900/90 rounded-3xl shadow-xl p-8 flex flex-col gap-6 border border-neutral-800"
        autoComplete="off"
      >
        <label
          htmlFor="photo"
          className="border-2 border-dashed border-neutral-700 rounded-2xl aspect-square flex flex-col items-center justify-center gap-3 text-neutral-400 hover:border-primary-500 transition-all cursor-pointer bg-neutral-800/40 hover:bg-neutral-800/70 group"
        >
          <PhotoIcon className="w-20 h-20 text-primary-500 group-hover:scale-110 transition-transform duration-200" />
          <div className="text-neutral-400 text-base font-medium group-hover:text-primary-400">
            Add a product photo
          </div>
          {/* 미리보기 추가 시: 
          {preview && (
            <img src={preview} alt="Preview" className="rounded-xl w-24 h-24 object-cover mt-2" />
          )} 
          */}
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          className="hidden"
        />

        <Input
          name="title"
          required
          placeholder="Product Name"
          type="text"
          className="input-glass"
        />
        <Input
          name="price"
          type="number"
          required
          placeholder="Price (USD)"
          className="input-glass"
        />
        <Input
          name="description"
          type="text"
          required
          placeholder="Detailed description"
          className="input-glass"
        />

        <Button
          text="Create Product"
          className="mt-2 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 hover:from-primary-700 hover:to-primary-500 text-lg font-semibold py-3 rounded-xl shadow-lg transition-all duration-200"
        />
      </form>
    </div>
  );
}
