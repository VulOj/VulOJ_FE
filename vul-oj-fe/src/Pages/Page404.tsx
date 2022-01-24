import { Result } from "antd";
import React from "react";

class Page404 extends React.Component {
  render() {
    return (
      <>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
        />,
      </>
    );
  }
}

export default Page404;