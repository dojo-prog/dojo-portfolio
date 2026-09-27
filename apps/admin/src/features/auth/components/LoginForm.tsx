import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { LoginBodySchema, type LoginBody } from "@dojo-portfolio/shared";
import ButtonLoader from "@/components/common/ButtonLoader";

const LoginForm = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(LoginBodySchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: login, isPending } = useLogin();

  const onSubmit = async (data: LoginBody) => {
    login(data, { onSuccess: () => navigate("/") });
  };

  return (
    <div className={cn("flex flex-col gap-6 w-full")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back Admin</CardTitle>
          <CardDescription className="text-xs">
            Login with your email & password
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@dojo.com"
                  {...form.register("email")}
                />

                <FieldError errors={[form.formState.errors.email]} />
              </Field>

              {/* Password */}
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  {...form.register("password")}
                />

                <FieldError errors={[form.formState.errors.password]} />
              </Field>

              <Field>
                {/* Login Button */}
                <Button type="submit" className={"text-white"}>
                  <ButtonLoader isLoading={isPending}>
                    <span>Login</span>
                  </ButtonLoader>
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
