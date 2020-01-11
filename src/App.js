import React from 'react';
import './App.css';
import Bar from './components/bar.js';
import Dashboard from './components/dashboard';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: 0,
            pos: 0,
            bars: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.makeList = this.makeList.bind(this);
        this.selectionSort = this.selectionSort.bind(this);
        this.fastSelectionSort = this.fastSelectionSort.bind(this);
        this.bubbleSort = this.bubbleSort.bind(this);
        this.insertionSort = this.insertionSort.bind(this);
        this.Cocktail_sort = this.Cocktail_sort.bind(this);
    }
    handleChange(e) {
        this.setState({
            items: e.target.value
        })
    }
    makeList() {
        if (this.state.items > 0) {
            let newBars = [];
            let val = 100 / this.state.items;
            for (let i = 0; i < this.state.items; i++) {
                let random = val * i + 1;
                newBars.push(new BarItem(random, id()));
            }
            for (let i = 0; i < this.state.items; i++) {
                let random = Math.round(Math.random() *( this.state.items - 1));
                let temp = newBars[i];
                newBars[i] = newBars[random];
                newBars[random] = temp;
            }

            this.setState({
                pos: 0,
                bars: newBars
            })
            this.forceUpdate();
        }
    }
    radixSort() {
        let newBars = this.state.bars;
        // Find the max number and multiply it by 10 to get a number
        // with no. of digits of max + 1
        const maxNum = Math.max(...newBars) * 10;
        let divisor = 10;
        while (divisor < maxNum) {
           // Create bucket newBarsays for each of 0-9
           let buckets = [...Array(10)].map(() => []);
           // For each number, get the current significant digit and put it in the respective bucket
           for (let num of newBars) {
              buckets[Math.floor((num % divisor) / (divisor / 10))].push(num);
           }
           // Reconstruct the newBarsay by concatinating all sub newBarsays
           newBars = [].concat.apply([], buckets);
           // Move to the next significant digit
           divisor *= 10;
        }
        return newBars;
     }
    selectionSort(lowesti = 0, recount = true) {
        if (this.state.items === "1") return;
        let newBars = this.state.bars;
        let lowest = {
            value: this.state.bars[this.state.pos].value,
            i: this.state.pos
        };
        if (recount) {
            for (let i = this.state.pos; i < this.state.items; i++) {
                if (newBars[i].value < lowest.value) {
                    lowest.value = newBars[i].value
                    lowest.i = i;
                }
            }
        } else {
            lowest = {
                value: this.state.bars[lowesti].value,
                i: lowesti
            };
        }
        let a = lowest.i !== this.state.pos
        if (a) {
            newBars.splice(lowest.i, 1);
            newBars.splice(lowest.i - 1, 0, new BarItem(lowest.value, id(), false))
        }

        this.setState((state) => {
            state.bars = newBars;
            if (lowest.i === state.pos) { state.pos += 1; state.bars[lowest.i].color = false }
        })
        if (this.state.pos < this.state.items) {
            setTimeout(() => {
                if (a) {
                    this.selectionSort(lowest.i - 1, false);
                }
                else
                    this.selectionSort();
            }, 0)
        } else {
            this.setState({
                pos: 0
            })
        }


    }
    fastSelectionSort(lasti) {
        if(typeof lasti == "object") lasti = 0;
        if (this.state.items === "1") return;
        let newBars = this.state.bars;
        let lowest = {
            value: this.state.bars[lasti].element.state.value,
            i: lasti
        };
        for (let i = lasti; i < this.state.items; i++) {
            if (newBars[i].element.state.value < lowest.value) {
                lowest.value = newBars[i].element.state.value
                lowest.i = i;
            }
        }
        let tmp = newBars[lowest.i].element.state.value
        newBars[lowest.i].element.setState({
            value:newBars[lasti].element.state.value
        })
        newBars[lasti].element.setState({
            value:tmp
        })
        if (lasti >= this.state.items - 1) {
            return;
        } 
        setTimeout(() => {
            this.fastSelectionSort(lasti + 1)
        },0)
         
       


    }
    bubbleSort() {
        let len = this.state.bars.length;
        let newBars = this.state.bars;
        let stop = false;
        for (let i = 0; i < len - 1; i++) {
            if (stop) break;
            for (let j = 0; j < len - 1; j++) {
                if (newBars[j].element.state.value > newBars[j + 1].element.state.value) {
                    let tmp = newBars[j].element.state.value;
                    newBars[j].element.setState({
                        value: newBars[j + 1].element.state.value
                    })
                    newBars[j + 1].element.setState({
                        value: tmp
                    })
                    stop = true;
                    break;
                }
            }
        }
        if (stop) {
            setTimeout(() => {
                this.bubbleSort()
            }, 0)
        }

    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.bars !== this.state.bars) return false;
        else return true
    }
    insertionSort(lasti = 1) {
        let newBars = this.state.bars;
        let stop = false;
        let savei = 0;
        if (typeof lasti == "object") lasti = 1;
        for (let i = lasti; i < newBars.length; i++) {
            if (stop) break;
            if (newBars[i].value < newBars[0].value) {
                //move current element to the first position
                newBars.unshift(newBars.splice(i, 1)[0]);
                stop = true;
                savei = i;
                break;
            }
            else if (newBars[i].value > newBars[i - 1].value) {
                //leave current element where it is
                continue;
            }
            else {
                //find where element should go
                for (let j = 1; j < i; j++) {
                    if (newBars[i].value > newBars[j - 1].value && newBars[i].value < newBars[j].value) {
                        //move element
                        newBars.splice(j, 0, newBars.splice(i, 1)[0]);
                        stop = true;
                        savei = i;
                        break;
                    }
                }
            }
        }
        this.setState({
            bars: newBars
        })
        if (stop) {
            setTimeout(() => {
                this.insertionSort(savei)
            }, 0)
        }
    }
    Cocktail_sort() {
        let newBars = this.state.bars;
        var swapped;
        let stop = false;
        do {
            for (var i = 0; i < newBars.length - 2; i++) {
                if (newBars[i].value > newBars[i + 1].value) {
                    let tmp = newBars[i];
                    newBars[i] = new BarItem(newBars[i + 1].value, id(), false);
                    newBars[i + 1] = new BarItem(tmp.value, id(), false)
                    swapped = true;
                    stop = true;
                }
            }
            if (!swapped) {
                break;
            }
            swapped = false;
            for (i = newBars.length - 2; i > 0; i--) {
                if (newBars[i].value > newBars[i + 1].value) {
                    let tmp = newBars[i];
                    newBars[i] = new BarItem(newBars[i + 1].value, id(), false);
                    newBars[i + 1] = new BarItem(tmp.value, id(), false)
                    swapped = true;
                    stop = true;
                }
            }
        } while (swapped && !stop);
        this.setState({
            bars: newBars
        })
        if (stop) {
            setTimeout(() => {
                this.Cocktail_sort();
            }, 0)
        }
    }

    render() {
        console.log("hej")
        const renderBars = this.state.bars.map((bar) => {
            return (<Bar ref={el => bar.element = el} color={bar.color} items={this.state.items} key={bar.id} value={bar.value}></Bar>)
        });
        const makeList = <button onClick={this.makeList} >Skapa lista </button>;
        const selectionSort = <button onClick={this.fastSelectionSort} >selectionSort </button>;
        const bubbleSort = <button onClick={this.bubbleSort} >bubbleSort </button>;
        const insertionSort = <button onClick={this.insertionSort} >insertionSort </button>;
        const cocktailSort = <button onClick={this.Cocktail_sort} >cocktailSort </button>;
        return (
            <div className="App">
                <div className="Controls">
                    <input placeholder="Antal" type="text" onChange={this.handleChange} />

                    {makeList}
                    {selectionSort}
                    {bubbleSort}
                    {insertionSort}
                    {cocktailSort}
                </div>


                {renderBars}

            </div>
        );
    }
}
function id() {
    let alf = "abcdefghijklmnopqrstvxyzABCDEFGHIJLKMNOPQRSTZXYZ";
    let id = "";
    for (let i = 0; i < 6; i++) {
        id += alf[Math.round(Math.random() * (alf.length - 1))]
    }
    return id;
}
class BarItem {
    constructor(value, id, color = "") {
        this.value = value;
        this.id = id;
        this.color = color;
    }
}


export default App;