"use client"
import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from 'react-hook-form'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import Link from 'next/link'


type FormType = "sign-up" | "sign-in"



const authSchema = (formType: FormType) => {
    return z.object({
        username: formType === "sign-up" ? z.string().min(2).max(50) : z.string().optional(),
        email: z.string().email(),
    })
}
const AuthForm = ({ type }: { type: FormType }) => {

    const formSchema = authSchema(type)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, SetErrorMessage] = useState("")
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: ""
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }


    return (
        <>
            <Form {...form}  >
                <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
                    <h1 className="form-title">{type === "sign-in" ? "Sign In" : "Sign Up"}</h1>
                    {type === "sign-up" && <FormField

                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <div className="shad-form-item">
                                    <FormLabel className='shad-form-label'>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your full name" className='shad-input'{...field} />
                                    </FormControl>

                                    <FormMessage className='shad-form-message' />
                                </div>
                            </FormItem>
                        )}
                    />
                    }



                    <>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="shad-form-item">
                                        <FormLabel className='shad-form-label'>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email" className='shad-input'{...field} />
                                        </FormControl>

                                        <FormMessage className='shad-form-message' />
                                    </div>
                                </FormItem>

                            )}
                        />


                    </>
                    <Button disabled={isLoading} className='shad-submit-btn' type="submit"> {type === "sign-in" ? "Sign In" : "Sign Up"}

                        {isLoading && (
                            <Image
                                src="/assets/icons/loader.svg"
                                alt="loader"
                                width={24}
                                height={24}
                                className="ml-2 animate-spin"
                            />
                        )}
                    </Button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <div className='body-2 flex justify-center'>
                        <p className='text-light-100'>
                            {type === "sign-in" ? "Not a member yet?" : "Already have an account?"}{" "}
                            <Link className='text-brand ml-1 font-medium' href={type === "sign-in" ? "/sign-up" : "/sign-in"} >
                                {type === "sign-in" ? "Sign up" : "Sign in"}  </Link>
                        </p>
                    </div>
                </form>
            </Form>

        </>
    )
}

export default AuthForm