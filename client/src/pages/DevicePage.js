import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {fetchOneDevice, fetchTypes} from "../http/deviceAPI";
import {Context} from "../index";
import CreateType from "../components/modals/CreateType";
import AddItemToLog from "../components/modals/AddItemToLog";

const DevicePage = () => {

    const {user} = useContext(Context)

    const [device, setDevice] = useState({info: []})
    const [type, setType] = useState(' ')
    const [logVisible, setLogVisible] = useState(false)

    const {id} = useParams()

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])
    fetchTypes().then(data => setType(data.at(device.typeId - 1).name))

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <p>Тип: {type}</p>
                        <p>Серийный номер: {device.serialNumber}</p>
                        <p>Дата поверки: {`${new Date(device.dateLastVerification).getFullYear()}-${String(new Date(device.dateLastVerification).getMonth() + 1).padStart(2, '0')}-${String(new Date(device.dateLastVerification).getDay()).padStart(2, '0')}`}</p>
                    </Row>
                </Col>
                {user.user.role === 'ADMIN' &&
                    <Col md={4}>
                        <Button variant={"outline-dark"}
                                className="mt-4 p-2"
                                onClick={() => setLogVisible(true)}
                        >
                            Добавить в журнал
                        </Button>
                        <AddItemToLog show={logVisible} onHide={() => setLogVisible(false)}/>
                    </Col>
                }
            </Row>
        </Container>
    );
};

export default DevicePage;
