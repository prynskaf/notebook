// src/app/sign-in/[[...index]]/page.tsx
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />;
}