import React from 'react';
import './App.css';
import Bar from './components/bar.js';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: 0,
      pos:0,
      bars: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.sort = this.sort.bind(this);
    this.bubbleSort = this.bubbleSort.bind(this);
  }
  handleChange(e) {
    this.setState({
      items: e.target.value
    })
  }
  sort() {
    if (this.state.items > 0) {
      let newBars = [];
      for (let i = 0; i < this.state.items; i++) {
        let random = Math.random() * 100;
        newBars.push(random);
      }

      this.setState({
        bars: newBars
      })
    }
  }
  bubbleSort(){
    setInterval(function() {
      this.setState((state, props) =>{
      });
    }.bind(this), 1000);
    // let newBars = this.state.bars;
    // let lowest ={ value:newBars[this.state.pos], i:this.state.pos};
    // for(let i = this.state.pos; i < this.state.items; i++){
    //   if(newBars[i] < lowest.value) {
    //     lowest.value = newBars[i]
    //     lowest.i = i;
    //   }
    // }
    // newBars.splice(lowest.i, 1);
    // newBars.splice(this.state.pos, 0, lowest.value)
    // this.setState({
    //   bars:newBars,
    //   pos: this.state.pos + 1,
    // })
    // if(this.state.pos < this.state.items){
    //   setTimeout(() => {
    //     this.bubbleSort();
    //   }, 200)
    // }

    
  }
  render() {
    let renderBars = this.state.bars.map((bar, index) => {
      return (<Bar items={this.state.items} key={index} value={bar} />)
    })
    console.log(renderBars)
    return (
      <div className="App">
        <input placeholder="Antal" type="text" onChange={this.handleChange} />
        <button onClick={this.sort}>
          Sortera
        </button>
        <button onClick={this.bubbleSort}>
          BubbleSort
        </button>
        <div className="Bars">
        {renderBars}
        </div>
        
      </div>
    );
  }
}


export default App;
