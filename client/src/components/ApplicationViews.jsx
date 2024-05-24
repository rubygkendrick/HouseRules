import { Route, Routes } from "react-router-dom";

import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { Home } from "./Home.jsx";
import UserProfileList from "./UserProfileList.jsx";
import UserProfileDetails from "./UserProfileDetails.jsx";
import ChoresList from "./ChoresList.jsx";
import ChoreDetails from "./ChoreDetails.jsx";
import CreateChore from "./CreateChore.jsx";
import MyChores from "./MyChores.jsx";


export default function ApplicationViews({ loggedInUser, setLoggedInUser, roles }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home />
            </AuthorizedRoute>
          }
        />

        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route
        path="userprofiles"
        element={
          <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
            <UserProfileList />
          </AuthorizedRoute>
        }
      />
      <Route
        path="userprofiles/:id"
        element={
          <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
            <UserProfileDetails />
          </AuthorizedRoute>
        }
      />
       <Route
        path="userprofiles/mychores/:id"
        element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
            <MyChores />
          </AuthorizedRoute>
        }
      />
      <Route path="chores">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser} >
              <ChoresList loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
        <Route
          path=":id"
          element={
            <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
              <ChoreDetails loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
         <Route
          path="create"
          element={
            <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
              <CreateChore loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />

      </Route>

    </Routes>
  );
}
