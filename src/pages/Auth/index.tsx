import { Button } from "@/components/ui/button";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  function clickHandler() {
    if (username === "admin") {
      navigate("/manager");
    } else {
      navigate("/cashier");
    }
  }

  return (
    <div className="max-w-sm">
      <form>
        <FieldGroup className="gap-4">
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="font-morabba text-2xl">ورود به حساب کاربری</h1>
            <p className="text-sm text-balance text-muted-foreground">
              برای ورود به اکانت اطلاعات خود را وارد نمایید.
            </p>
          </div>
          <Field>
            <FieldLabel htmlFor="username">نام کاربری</FieldLabel>
            <Input
              className="h-10"
              dir="ltr"
              id="username"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="jhon_doe"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">رمز عبور</FieldLabel>
            <Input className="h-10" dir="ltr" id="password" type="password" required />
          </Field>
          <Field>
            <Button onClick={clickHandler} size="xl">
              ورود
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
