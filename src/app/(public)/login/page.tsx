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
    </div>
  );
}
