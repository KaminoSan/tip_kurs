import React, {useContext, useEffect, useState} from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useHistory} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/consts";
import {fetchTypes} from "../http/deviceAPI";

const DeviceItem = ({device}) => {
    const history = useHistory()

    const [type, setType] = useState( ' ')

    useEffect(() => {
        fetchTypes().then(data => setType(data[device.typeId - 1].name));
    }, [])

    return (
        <Col md={3} className={"mt-3"} onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
                <div>
                    <p>Название предмета: {device.name}</p>
                    <p>Тип: {type}</p>
                    <p>Серийный номер: {device.serialNumber}</p>
                    <p>Дата поверки: {`${new Date(device.dateLastVerification).getFullYear()}-${String(new Date(device.dateLastVerification).getMonth() + 1).padStart(2, '0')}-${String(new Date(device.dateLastVerification).getDay()).padStart(2, '0')}`}</p>
                </div>
            </Card>
        </Col>
    );
};

export default DeviceItem;
