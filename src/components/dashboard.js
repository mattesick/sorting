import React from 'react';

class Dashboard extends React.PureComponent {
    constructor() {
        super()
        // Bind the method to the component context
        this.renderChildren = this.renderChildren.bind(this)
      }
    renderChildren() {
        return React.Children.map(this.props.children, child => {
          // TODO: Change the name prop to this.props.name
            return child
        })
      }
    render() {
        return(
        <div className="Bars">
            {this.renderChildren()}
        </div>)

    }
}

export default Dashboard;