import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";

const Copyright = () => {
    return (
        <MDBFooter style={{ paddingTop: "12.82rem" }}>
            <div style={{ fontSize: "0.7rem" }}>
                <MDBContainer fluid style={{ color: "white" }}>&copy; {new Date().getFullYear()} Copyright: Tomasz Rybak</MDBContainer>
            </div>
        </MDBFooter>
    );
}

export default Copyright;