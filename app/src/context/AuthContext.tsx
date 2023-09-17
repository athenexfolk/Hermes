// import { createContext, useEffect, useState } from "react";

// const defaultProvider = {
//   user: null,
//   setUser: () => null,
//   login: () => Promise.resolve(),
//   logout: () => Promise.resolve(),
// };

// const AuthContext = createContext(defaultProvider);

// interface AuthProviderProps {
//     children: React.ReactNode
// }

// const AuthProvider = ({ children } : AuthProviderProps) => {

//   const [user, setUser] = useState(defaultProvider.user);

//   // ** Hooks
// //   const router = useRouter();

//   const [open, setOpen] = useState(false);

//   const initAuth = () => {
//     const storedToken = window.localStorage.getItem("userToken") || null;

//     if (storedToken) {
//       const getToken = storedToken.replace(/"/g, "");

//       const decoded : string = jwt_decode(getToken);
//       setUser(decoded);
//       localStorage.setItem("userData", JSON.stringify(decoded));
//     }
//   };

//   useEffect(() => {
//     initAuth();
//   }, []);


//   const handleLogin = (params, errorCallback) => {
//     const { email, password } = params;
//     console.log(email);

//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     var raw = JSON.stringify({
//       email: email,
//       password: password,
//       // StatusRemember: rememberMe === true ? 1 : 0
//     });

//     var requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     };

//     fetch(process.env.NEXT_PUBLIC_ENDPOINT + "login", requestOptions)
//       .then(async (response) => response.json())
//       .then((result) => {
//         console.log(result);
//         if (result["message"] === "Login Success") {
//           window.localStorage.setItem(
//             "userToken",
//             JSON.stringify(result.token)
//           );

//           // window.localStorage.setItem('test', 'hello world')
//           const returnUrl = router.query.returnUrl;
//           const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";
//           router.replace(redirectURL);
//           console.log("Pass!");

//           {
//             /*-----------Get API User----------*/
//           }

//           const storedToken = window.localStorage.getItem("userToken") || null;
//           const getToken = storedToken.replace(/"/g, "");

//           const decoded = jwt_decode(getToken);
//           setUser(decoded);
//           localStorage.setItem("userData", JSON.stringify(decoded));
//           console.log(decoded);


//         } else if (result["message"] === "Login Failed") {
//           console.log("Username or password Invalid!");
//           // setLoginStatus('Username or password Invalid!')
//         } else if (result["message"] === "user does not exist") {
//           console.log("User does not exist!");
//           // setLoginStatus("User does not exist!")
//         } else {
//           console.log("Error");
//           // setLoginStatus("User Read Success")
//         }
//       })
//       .catch((error) => console.log("Error : ", error));
//   };

//   //function for logout
//   //This part will remove user data in local storage
//   const handleLogout = () => {
//     setUser(null)
//     window.localStorage.removeItem("userData");
//     window.localStorage.removeItem("userToken");
//     router.push("/");
//   };

//   const values = {
//     user,
//     setUser,
//     login: handleLogin,
//     logout: handleLogout,
//   };

//   return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
// };

// export { AuthContext, AuthProvider };
