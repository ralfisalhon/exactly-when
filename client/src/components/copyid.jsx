import React, { Component } from "react";
import Button from "./button"

export default class CopyID extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonText : "Copy to clipboard"
        };
    }
        
    render() {
        const { id } = this.props;
        const { buttonText } = this.state;

        return (
            <div>
                <p>{"https://exactly-when.herokuapp.com?id=" + id}</p>

                {
                    // Only render the copy button if copying is supported
                    document.queryCommandSupported("copy") &&
                        <Button
                            text={buttonText}
                            type="alt"
                            onClick={() => {
                                navigator.clipboard.writeText("https://exactly-when.herokuapp.com?id=" + id);
                                this.setState({buttonText: "Copied!"});
                            }}
                        />
                }
            </div>
        );
    }
};
