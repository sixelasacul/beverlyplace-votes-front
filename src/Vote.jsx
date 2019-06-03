import React, {Component} from "react";
import PropTypes from "prop-types";
import { Group, Rect, Text } from "react-konva";

export default class Vote extends Component {
    static propTypes = {
        playerName: PropTypes.string.isRequired,
        playerNumber: PropTypes.number.isRequired,
        xOrigin: PropTypes.number.isRequired,
        yOrigin: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired
    }

    static defaultProps = {
        playerName: "",
        playerNumber: 0
    }

    render() {
        const {xOrigin, yOrigin, width, height, playerName} = this.props;
        const rectYOrigin = yOrigin + 25;
        
        return (
            <Group>
                <Text
                    x={xOrigin}
                    y={yOrigin}
                    width={width}
                    height={50}
                    text={playerName}
                    fontSize={20}
                    fontFamily="Abril Fatface"
                    />
                <Rect
                    x={xOrigin}
                    y={rectYOrigin}
                    width={width}
                    height={height}
                    fill="#ff0000"
                    />
            </Group>
        );
    }
}
