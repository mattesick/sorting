import React from 'react';

class Bar extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value,
            items: props.items
        }

    }
    render() {
        console.log("called")
        const styles = {
            backgroundColor: calcColor(0, 100, this.state.value),
            height: this.state.value + "%",
            width: (window.innerWidth / parseInt(this.state.items)) / 1.05,
            border: "none",
            transform: "none"
        }
        if (this.props.color) {
            styles.backgroundColor = "#000";
            styles.border = "2px solid pink";
            styles.transform =  "translateY(-200px) rotateY(180deg)";
        }
        return (
            <div className = "bar" style={styles} ></div>
        );
    }
}
function calcColor(min, max, val) {
    var minHue = 240, maxHue = 0;
    var curPercent = (val - min) / (max - min);
    var colString = "hsl(" + ((curPercent * (maxHue - minHue)) + minHue) + ",100%,50%)";
    return colString;
}

export default Bar;