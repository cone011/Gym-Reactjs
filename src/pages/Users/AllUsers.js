import { useEffect } from "react";
import useHttp from "../../hook/use-http";
import UserList from "../../components/Users/UsersList/UsersList";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import { GetAllUsuario } from "../../lib/UsuarioApi";

const AllUsers = () => {
  const {
    sendRequest,
    status,
    data: loadedUsers,
    error,
  } = useHttp(GetAllUsuario, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  return <UserList userData={loadedUsers} isSearching={false} />;
};

export default AllUsers;
