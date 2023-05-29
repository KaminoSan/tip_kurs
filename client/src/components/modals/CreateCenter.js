import {observer} from "mobx-react-lite";
import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {createCenter} from "../../http/deviceAPI";

const CreateCenter = observer(({show, onHide}) => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [contacts, setContacts] = useState('')

    const addCenter = () => {
        createCenter({name, address, contacts}).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить центр поверок
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название центра"
                    />
                    <Form.Control
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className="mt-3"
                        placeholder="Введите адрес центра"
                        type="text"
                    />
                    <Form.Control
                        value={contacts}
                        onChange={e => setContacts(e.target.value)}
                        className="mt-3"
                        placeholder="Введите контакты"
                        type="text"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addCenter}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
});

export default CreateCenter