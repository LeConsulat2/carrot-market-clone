"use client";

import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Input from "@/components/input";
import Button from "@/components/button";
import { uploadProduct } from "./actions";
import { useActionState } from "react";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const [error, setError] = useState(""); // 에러 메시지 상태 추가

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // 파일 사이즈 체크 (2MB = 2 * 1024 * 1024 바이트)
    if (file.size > 2 * 1024 * 1024) {
      setError("Maximum file size is 2MB.");
      setPreview("");
      return;
    }
    setError(""); // 에러 초기화
    const url = URL.createObjectURL(file);
    setPreview(url);
  };
  const [state, action] = useActionState(uploadProduct, null);
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 flex items-center justify-center px-4">
      <form
        action={action}
        method="POST"
        encType="multipart/form-data"
        className="w-full max-w-md bg-neutral-900/90 rounded-3xl shadow-xl p-8 flex flex-col gap-6 border border-neutral-800"
        autoComplete="off"
      >
        <label
          htmlFor="photo"
          className={[
            "border-2 border-dashed border-neutral-700 rounded-2xl aspect-square flex flex-col items-center justify-center gap-3 cursor-pointer group transition-all",
            preview
              ? ""
              : "bg-neutral-800/40 hover:bg-neutral-800/70 text-neutral-400",
          ].join(" ")}
          style={
            preview
              ? {
                  backgroundImage: `url(${preview})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        >
          {preview === "" ? (
            <>
              <PhotoIcon className="w-20 h-20 text-primary-500 group-hover:scale-110 transition-transform duration-200" />
              <div className="text-neutral-400 text-base font-medium group-hover:text-primary-400">
                Add a product photo
              </div>
              {state?.fieldErrors.photo && (
                <div className="text-red-500 text-sm font-medium -mt-4 mb-1">
                  {state?.fieldErrors.photo[0]}
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col gap-2 *:rounded-md">
              <div className="bg-neutral-700 h-5 w-40" />
              <div className="bg-neutral-700 h-5 w-20" />
              <div className="bg-neutral-700 h-5 w-10" />
            </div>
          )}
        </label>
        {/* 에러 메시지 영역
        {state?.error && (
          <div className="text-red-500 text-sm font-medium -mt-4 mb-1">{state?.error}</div>
        )} */}
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
          errors={state?.fieldErrors.title}
        />
        <Input
          name="price"
          type="number"
          required
          placeholder="Price (NZD)"
          className="input-glass"
          errors={state?.fieldErrors.price}
        />
        <Input
          name="description"
          type="text"
          required
          placeholder="Detailed description"
          className="input-glass"
          errors={state?.fieldErrors.description}
        />

        <Button
          text="Create Product"
          className="mt-2 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 hover:from-primary-700 hover:to-primary-500 text-lg font-semibold py-3 rounded-xl shadow-lg transition-all duration-200"
        />
      </form>
    </div>
  );
}