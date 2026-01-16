import { SignUpForm } from "~/features/auth/components/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <SignUpForm />
    </div>
  );
}
