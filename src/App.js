import './App.css';
import SignIn from './components/SignIn';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase.js";
import Line from "./components/line"

// The brackets are used to destructure the value returned by useAuthState hook, allowing easy access to the user property without needing to reference the entire object.
function App() {
  const [user] = useAuthState(auth);
  return (
    <div>
      {user ? <Line /> : <SignIn /> }
    </div>
  );
}

export default App;
