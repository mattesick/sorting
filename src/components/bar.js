import React from 'react';

class Bar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            value:props.value,
            items:props.items
        }

    }
    render() {
        console.log(window.innerWidth / this.state.items);
        
        const styles = {
            backgroundColor:calcColor(0, 100, this.state.value),
            height:this.state.value + "%",
            width:window.innerWidth / parseInt(this.state.items)
        }
        return (
        <div style={styles} ></div>
        );
    }
}
function calcColor(min, max, val)
{
    var minHue = 240, maxHue=0;
    var curPercent = (val - min) / (max-min);
    var colString = "hsl(" + ((curPercent * (maxHue-minHue) ) + minHue) + ",100%,50%)";
    return colString;
}

export default Bar;