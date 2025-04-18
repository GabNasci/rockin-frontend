import CreateAccountCard from "./_components/form/create-account-card";
import GenresAndSpecialitiesStep from "./_components/form/steps/genres_and_specialities-step";
// import CredentialsStep from "./_components/form/steps/credentials-step";
import ProfileInfoStep from "./_components/form/steps/profile-info-step";
import FormLogo from "./_components/formLogo";

export default function SignUp() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <FormLogo />
      <CreateAccountCard>
        {/* <CredentialsStep /> */}
        {/* <ProfileInfoStep /> */}
        <GenresAndSpecialitiesStep />
      </CreateAccountCard>
    </div>
  );
}
