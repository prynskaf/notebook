import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <SignIn routing="path" path="/sign-in" />
    </div>
  );
}
