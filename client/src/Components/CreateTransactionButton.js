import { useContext } from "react";
import { ListContext } from "../Contexts/ListContext";
import Button from "./lib/Button";
import { CredentialContext } from "../Contexts/CredentialContext";

export default function CreateTransactionButton() {
  const { list, totalPrice } = useContext(ListContext);
  const { token } = useContext(CredentialContext);

  const createTransaction = () => {
    const data = {
      firstName: "mathieu",
      lastName: "pionnier",
      price: totalPrice,
      addressFacturation: "Paris",
      addressLivraison: "Paris",
      date: "2020-12-21",
      currency: "EUR",
      state: "PENDING",
  }

    fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Basic " + token,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <Button title="create Transaction" onClick={() => createTransaction()} />
  );
}
