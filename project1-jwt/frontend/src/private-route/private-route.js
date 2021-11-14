import { Navigate, Route } from "react-router-dom";
import { isAuthenticated } from "../util/authOperations";
const PrivateRoute = ({ children }) => {
  const authed = isAuthenticated() // isauth() returns true or false based on localStorage
  
  return authed ? children : <Navigate to="/login" />;
}

// const PrivateRoute = ({ component: Component, ...rest}) => (
//     <Route
//       {...rest}
//       render={props => (
//         isAuthenticated()
//         ? (
//            <Component {...props} />
//         )
//         : (<Navigate to={{ pathname: '/login', state: { from: props.location} }} />)
//       )}
//     />
//     );
    
    export default PrivateRoute;