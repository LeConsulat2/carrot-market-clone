"use server";

import { PhotoIcon } from "@heroicons/react/24/solid";
import ModalCloseButton from "../../../../../../components/modal-close-button";

export default async function Modal({ params }: { params: { id: string } }) {
  // TODO: Add logic to fetch product details using params.id if this modal should display product info.
  // The current task focuses on refactoring the close button and component type.
  return (
    <div className="absolute w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-60 left-0 top-0">
      <ModalCloseButton />
      <div className="max-w-screen-sm h-1/2 flex justify-center w-full">
        <div className="aspect-square bg-neutral-700 text-neutral-200 rounded-md flex justify-center items-center">
          <PhotoIcon className="h-28" />
        </div>
      </div>
    </div>
  );
}