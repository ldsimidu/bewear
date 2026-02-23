import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import LogInForm from "./components/log-in-form";
import SignUpForm from "./components/sign-up-form";

const Authentication = () => {
  return (
    <div className="flex h-screen w-screen justify-center bg-slate-100 p-6">
      <Tabs
        defaultValue="sign-in"
        className="mt-5 mb-5 w-[500px] rounded-md bg-slate-200 p-6"
      >
        <TabsList className="relative flex w-full bg-slate-300 pt-6 pb-6">
          <TabsTrigger className="pt-6 pb-6" value="sign-in">
            Sign In
          </TabsTrigger>
          <TabsTrigger className="pt-6 pb-6" value="sign-up">
            Create account
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sign-in">
          <LogInForm />
        </TabsContent>

        <TabsContent value="sign-up">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Authentication;
