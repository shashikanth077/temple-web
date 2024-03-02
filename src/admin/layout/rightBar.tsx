import React from 'react';
import { Button, Col, Offcanvas, Row } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import useThemeCustomizer from 'ThemeCustomizer/useThemeCustomizer';
import { ThemeCustomizer } from 'ThemeCustomizer';
import { ThemeSettings, useThemeContext } from 'context/useThemeContext';

const RightSidebar = () => {
  const { updateSettings, settings } = useThemeContext();

  const { reset } = useThemeCustomizer();

  const isOpenRightSideBar = settings.rightSidebar;

  const handleRightSideBar = () => {
    updateSettings({ rightSidebar: ThemeSettings.rightSidebar.hidden });
  };
  return (
    <Offcanvas
      show={isOpenRightSideBar}
      onHide={handleRightSideBar}
      placement="end"
      id="theme-settings-offcanvas"
    >
      <Offcanvas.Header
        className="d-flex align-items-center bg-primary p-3"
        closeVariant="white"
        closeButton
      >
        <h5 className="text-white m-0">Theme Settings</h5>
      </Offcanvas.Header>

      <Offcanvas.Body className="p-0">
        <SimpleBar scrollbarMaxSize={320} className="h-100">
          <ThemeCustomizer />
        </SimpleBar>
      </Offcanvas.Body>

      <div className="offcanvas-footer border-top p-3 text-center">
        <Row>
          <Col xs={6}>
            <Button
              type="button"
              variant="light"
              className="w-100"
              id="reset-layout"
              onClick={reset}
            >
              Reset
            </Button>
          </Col>
          <div className="col-6">
            <Link
              to="https://themes.getbootstrap.com/product/hyper-responsive-admin-dashboard-template/"
              target="_blank"
              role="button"
              className="btn btn-primary w-100"
            >
              Buy Now
            </Link>
          </div>
        </Row>
      </div>
    </Offcanvas>
  );
};

export default RightSidebar;
