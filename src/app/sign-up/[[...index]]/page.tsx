// src/app/sign-up/[[...index]]/page.tsx
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />;
}
