// COMPONENTS
import { LoginForm, RegisterForm } from "@/components/forms/auth-forms";
import HomeLink from "@/components/links/home-link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Auth() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-5 p-4 md:p-6 lg:p-8">
      <div className="flex w-[350px] flex-col items-center justify-center gap-2 space-y-1 text-center sm:w-[400px] md:w-[420px] lg:w-[450px]">
        <HomeLink
          linkHref="/"
          iconStyle="size-8"
          textStyle="text-3xl font-semibold"
        />
        <p className="text-sm leading-tight text-muted-foreground lg:text-base">
          The only code editor you need for programming.
        </p>
      </div>
      <Tabs
        defaultValue="login"
        className="w-[350px] sm:w-[400px] md:w-[420px] lg:w-[450px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
