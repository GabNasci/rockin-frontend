import Link from "next/link";
import FormLogo from "../../../components/shared/formLogo";
import LoginCard from "./_components/form/login-card";
import LoginStep from "./_components/form/steps/login-step";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <FormLogo />
      <LoginCard>
        <LoginStep />
      </LoginCard>
      <span className="text-sm  underline cursor-pointer text-muted-foreground pt-8">
        Ainda não tem uma conta?{" "}
        <Link href="/signup" className="font-semibold text-primary">
          Cadastre-se
        </Link>
      </span>
    </div>
  );
}
