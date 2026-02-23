"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.email("Please, enter email address correctly."),
  password: z.string("Your password is not corret, please try again."),
});

type FormValues = z.infer<typeof formSchema>;

const LogInForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log("LOGIN FORM VALIDATED AND SENT");
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="mt-5 bg-slate-50">
            <CardHeader>
              <CardTitle>Log In to your account</CardTitle>
              <CardDescription>
                Enter your registered email and password to log in to your
                BeWear account! If you don't have one, click on 'Sign Up' button
              </CardDescription>
            </CardHeader>
          </Card>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insert your email"
                    className="bg-slate-50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passowrd</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insert your password"
                    className="bg-slate-50"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Enter
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LogInForm;
