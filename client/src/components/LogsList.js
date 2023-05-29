import Row from "react-bootstrap/Row";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import LogItem from "./LogItem";

const LogsList = observer(() => {
    const {device} = useContext(Context)

    return (
        <Row className="d-flex">
            {device.verificationLogs.map(log =>
                <LogItem key={log.id} log={log}/>
            )}
        </Row>
    )
})

export default LogsList