import { useContext } from "react";
import { CredentialContext } from "../../Contexts/CredentialContext";
import AdminCredentialForm from "./AdminCredentialForm";

export default function Credentials() {
  const { token, secret, save, decodeCredentials } = useContext(CredentialContext);
  return (
    <>
      <AdminCredentialForm
        onSubmit={(values) => save(values.token, values.secret)}
        defaultValues={decodeCredentials}
      />
      <p>token {token}</p>
      <br/>
      <p> secret {secret}</p>
    </>
  );
}