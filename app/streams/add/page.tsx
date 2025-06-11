"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useActionState } from "react";
import { startStream } from "./actions";


export default function AddStream() {
   const [state, action] = useActionState(startStream, null);
   return (
    <form className="p-10 flex flex-col gap-2" action={action}>
        <Input name="title" type="text" placeholder="Stream Title" />
        <Button text="Start Streaming" loading={state?.pending} />
    </form>
   )

}