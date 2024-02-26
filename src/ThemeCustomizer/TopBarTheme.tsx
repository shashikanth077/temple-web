import React from 'react';
import {
    Col, Form, Image, Row,
} from 'react-bootstrap';

import { ThemeSettings } from 'context/useThemeContext';

type TopBarThemeProps = {

handleChangeTopBarTheme: (value: any) => void
topBarTheme?: string
layoutConstants: typeof ThemeSettings.topbar.theme
}

const TopBarTheme = ({

    handleChangeTopBarTheme,

    topBarTheme,

    layoutConstants,

}: TopBarThemeProps) => (

    <>

        <h5 className="my-3 fs-16 fw-bold">Topbar Color</h5>

        <Row>

            <Col xs={4}>

                <Form.Check className="form-switch card-switch mb-1">

                    <Form.Check.Input
                        className="form-check-input"
                        type="radio"
                        name="data-topbar-color"
                        id="topbar-color-light"
                        value={layoutConstants.light}
                        onChange={e => handleChangeTopBarTheme(e.target.value)}
                        checked={topBarTheme === layoutConstants.light}
                    />

                    <Form.Check.Label htmlFor="topbar-color-light">
                        <Image fluid src="#" alt="" />
                    </Form.Check.Label>

                </Form.Check>

                <h5 className="font-14 text-center text-muted mt-2">Light</h5>

            </Col>

            <Col xs={4}>

                <Form.Check className="form-switch card-switch mb-1">

                    <Form.Check.Input
                        className="form-check-input"
                        type="radio"
                        name="data-topbar-color"
                        id="topbar-color-dark"
                        value={layoutConstants.dark}
                        onChange={e => handleChangeTopBarTheme(e.target.value)}
                        checked={topBarTheme === layoutConstants.dark}

                    />

                    <Form.Check.Label
                        className="form-check-label"
                        htmlFor="topbar-color-dark"
                    >

                        <Image fluid src="#" alt="" />

                    </Form.Check.Label>

                </Form.Check>

                <h5 className="font-14 text-center text-muted mt-2">Dark</h5>

            </Col>

        </Row>

    </>

);

export default TopBarTheme;
