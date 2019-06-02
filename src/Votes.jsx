import React, {Component} from "react";
import PropTypes from "prop-types";
import { Stage, Layer } from "react-konva";
import Vote from "./Vote";

export default class Votes extends Component {
    static propTypes = {
        players: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            height: 0
        };

        this.findMaxVote = this.findMaxVote.bind(this);
        this.computeHeights = this.computeHeights.bind(this);
        this.viewportSizeUpdated = this.viewportSizeUpdated.bind(this)
        this.shareWidth = this.shareWidth.bind(this);
        this.sortingByVotes = this.sortingByVotes.bind(this);
        this.alphabeticalSort = this.alphabeticalSort.bind(this);
        this.compareString = this.compareString.bind(this);
    }

    componentDidMount() {
        this.viewportSizeUpdated();
        window.addEventListener("resize", this.viewportSizeUpdated);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.viewportSizeUpdated);
    }

    viewportSizeUpdated() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }
    

    findMaxVote() {
        const {players} = this.props;

        let max = 0;
        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            if(player.votes > max) {
                max = player.votes;
            }
        }
        return max;
    }

    computeHeights(players) {
        const {height} = this.state;
        
        const maxVote = this.findMaxVote();
        return players.map(player => (player.votes * height) / maxVote);
    }

    shareWidth(offset) {
        const {width} = this.state;
        const {players} = this.props;
        return (width - offset * (players.length+1)) / players.length;
    }

    sortingByVotes(p1, p2) {
        if(p1.votes < p2.votes) {
            return 1;
        }
        if(p1.votes > p2.votes) {
            return -1;
        }
        return this.alphabeticalSort(p1, p2);
    }

    alphabeticalSort(p1, p2) {
        if(p1.name.length === p2.name.length) {
            return this.compareString(p1.name, p2.name);
        }
        if(p1.name.length < p2.name.length) {
            const p2ResizedName = p2.name.slice(0, p1.name.length);
            return this.compareString(p1.name, p2ResizedName);
        }
        if(p1.name.length > p2.name.length) {
            const p1ResizedName = p1.name.slice(0, p2.name.length);
            return this.compareString(p1ResizedName, p2.name);
        }
    }

    compareString(s1, s2) {
        if(s1 < s2)
            return -1;
        if(s1 > s2)
            return 1;
    }

    sort(arr, sortMethod) {
        return arr.concat().sort(sortMethod);
    }

    render() {
        const {width, height} = this.state;
        const {players} = this.props;

        const xOffset = 50;
        const sortedArray = this.sort(players, this.sortingByVotes);
        const heights = this.computeHeights(sortedArray);
        const sharedWidth = this.shareWidth(xOffset);

        let x = xOffset;
        return (
            <Stage width={width} height={height}>
                <Layer>
                    {sortedArray.map((player, index) => {
                        const localX = x;
                        x = x + sharedWidth + xOffset;
                        return <Vote key={index}
                            playerName={player.name}
                            playerNumber={player.number}
                            xOrigin={localX}
                            yOrigin={player.votes !== 0 ? height + 50 - heights[index] : height - 50}
                            width={sharedWidth}
                            height={heights[index]} />
                    })}
                </Layer>
            </Stage>
        );
    }
}
