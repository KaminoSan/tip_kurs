import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {addToLog, fetchCenter} from "../../http/deviceAPI";
import {Context} from "../../index";
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form} from "react-bootstrap";
import {useHistory, useParams} from "react-router-dom";


const AddItemToLog = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [dateVerification, setDateVerification] = useState('')
    const [resultVerification, setResultVerification] = useState('')
    const [selectedCenter, setSelectedCenter] = useState({})

    useEffect(() => {
        fetchCenter().then(data => device.setCenters(data))
    }, [])

    const {id} = useParams()
    const add = () => {
        const VerificationCenterId = selectedCenter.id
        const ItemId = id;
        addToLog({dateVerification, resultVerification, ItemId, VerificationCenterId}).then(data => onHide)
    }

    return(
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить в журнал
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{"Выберите центр поверок"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.centers.map(center =>
                                <Dropdown.Item
                                    onClick={() => setSelectedCenter(center)}
                                    key={center.id}
                                >
                                    {center.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={resultVerification}
                        onChange={e => setResultVerification(e.target.value)}
                        className="mt-3"
                        placeholder="Введите результат поверки"
                        type="text"
                    />
                    <Form.Control
                        value={dateVerification}
                        onChange={e => setDateVerification(Date(e.target.value))}
                        className="mt-3"
                        placeholder="Введите дату последней поверки"
                        type="date"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={add}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default AddItemToLog;