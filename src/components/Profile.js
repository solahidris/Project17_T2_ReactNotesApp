import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <article>
        {JSON.stringify(user)}
        {user?.picture && <img src={user.picture} alt={user?.name} />}
        <h2>{user?.name}</h2>
        <ul>
          {Object.keys(user).map((objKey, index) => (
            <li key={index}>
              {objKey}: {user[objKey]}
            </li>
          ))}
        </ul>
      </article>
    )
  );
};

export default Profile;
