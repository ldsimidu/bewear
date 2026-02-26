"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z, { email } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

//Data Form Schema
const formSchema = z
  .object({
    completeName: z.string("Invalid name.").trim().min(1, "Name is mandatory."),

    email: z.string().email("Enter a valid email."),

    password: z.string().min(8, "Your password needs at least 8 characters."),

    passwordConfirmation: z
      .string()
      .min(8, "Your password needs at least 8 characters."),
  })
  .refine(
    //param data = data that I have in the schema
    //first: happy world
    //second: sad world & the path where the error will show
    (data) => {
      return data.password === data.passwordConfirmation;
    },
    {
      error: "The passowrds don't match",
      path: ["passwordConfirmation"],
    },
  );

type FormValues = z.infer<typeof formSchema>;

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      completeName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  async function onSubmit(values: FormValues) {
    const { data, error } = await authClient.signUp.email({
      name: values.completeName,
      email: values.email,
      password: values.password,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Account created successfully");
          router.push("/");
        },
        onError: (error) => {
          if (error.error.code == "USER_ALREADY_EXISTS") {
            toast.error("Email is already in use. Please try another.");
            form.setError("email", {
              message: "Email already in use, please try another",
            });
          }
        },
      },
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="mt-5 bg-slate-50">
            <CardHeader>
              <CardTitle>Create your new account!</CardTitle>
              <CardDescription>Signup text</CardDescription>
            </CardHeader>
          </Card>
          <FormField
            control={form.control}
            name="completeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insert your first name"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your best email</FormLabel>
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
                <FormLabel>A strong password</FormLabel>
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
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm your password</FormLabel>
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

export default SignUpForm;
