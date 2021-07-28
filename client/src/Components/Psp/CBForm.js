import { ListContext } from "../../Contexts/ListContext";
import Button from "../lib/Button";
import Modal from "../lib/Modal";

export default function CreateTransactionButton() {
  const { list, totalPrice } = useContext(ListContext);

  return (
    <>
      <Button title="add" onClick={() => setModal(true)} />
      <Modal
        title="Fill your CB card information"
        open={Boolean(modal)}
        onClose={() => setModal(false)}
      >
        <Form onSubmit={handleSubmit} item={modal !== true && modal} />
      </Modal>
    </>
  );
}
