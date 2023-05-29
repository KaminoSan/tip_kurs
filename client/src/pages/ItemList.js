import React, {useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchDevices, fetchLog, fetchTypes} from "../http/deviceAPI";
import Pages from "../components/Pages";
import LogsList from "../components/LogsList";

const ItemList = observer(() => {
    const {device} = useContext(Context)

    const [showCenters, setShowCenters] = useState(false)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchDevices(null, 1, 2).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
        fetchLog(1, 5).then(data => device.setVerificationLogs(data.rows))
    }, [])

    const handleToggle = () => {
        setShowCenters(!showCenters);
    }

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.page, 2).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <button onClick={handleToggle}>{showCenters ? 'Список предметов' : 'Журнал поверок'}</button>
                    {showCenters ?
                        <LogsList/>
                        :
                        <DeviceList/>
                    }
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default ItemList;
