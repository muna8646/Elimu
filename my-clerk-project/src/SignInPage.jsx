// SignInPage.jsx
import { SignIn, SignUp } from '@clerk/clerk-react';

function SignInPage() {
  return (
    <div>
      <h2>Sign In</h2>
      <SignIn routing="path" signUpUrl="/sign-up" />
      <h3>New here?</h3>
      <SignUp routing="path" signInUrl="/sign-in" />
    </div>
  );
}

export default SignInPage;
