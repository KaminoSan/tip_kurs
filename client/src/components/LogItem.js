import React, {useEffect, useState} from "react";
import {Card, Col, Image} from "react-bootstrap";
import {fetchOneDevice} from "../http/deviceAPI";

const LogItem = ({log}) => {

    const [item, setItem] = useState({})
    useEffect(() => {
        fetchOneDevice(log.ItemId).then(data => setItem(data))
    }, [])

    return (
        <Col md={3} className={"mt-3"}>
            <Card style={{width: 250, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + item.img}/>
                <div>
                    <p>Поверка предмета: {item.name}</p>
                    <p>Серийный номер: {item.serialNumber}</p>
                    <p>Дата
                        поверки: {`${new Date(log.dateVerification).getFullYear()}-${String(new Date(log.dateVerification).getMonth() + 1).padStart(2, '0')}-${String(new Date(log.dateVerification).getDay()).padStart(2, '0')}`}</p>
                    <p>Результат поверки: {log.resultVerification}</p>
                </div>
            </Card>
        </Col>
    );
};

export default LogItem;
