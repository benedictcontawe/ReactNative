import { useContext, useState } from 'react';
import AuthContent from "../components/AuthContent";
import { createUser } from '../util/auth';
import { AuthContext } from '../store/auth-context';
import LoadingOverlay from '../components/LoadingOverlay';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    try {
      setIsAuthenticating(true);
      const token = await createUser(email, password);
      authCtx.authenticate(token);
      await createUser(email, password);
    } catch (error) {
      Alert.alert(
        'Authentication failed',
        'Could not create user, please check your input and try again later.'
      );
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;