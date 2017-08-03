import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { _ } from 'meteor/underscore';
import Menu from '../../components/Menu/Menu';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

import './Order.scss';

class Order extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      method: 'delivery',
      items: [],
    };

    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleSetOrderMethod = this.handleSetOrderMethod.bind(this);
  }

  handleAddItem(item) {
    const existingOrderItems = this.state.items.slice();
    existingOrderItems.push(item);
    this.setState({ items: existingOrderItems });
  }

  handleRemoveItem(itemName) {
    const existingOrderItems = this.state.items.slice();
    existingOrderItems = _.reject(existingOrderItems, item => item.name === itemName);
    this.setState({ items: existingOrderItems });
  }

  handleSetOrderMethod(method) {
    this.setState({ method });
  }

  render() {
    return (<div className="Order">
      <Row>
        <Col xs={12} sm={8}>
          <Menu menu="appetizers" onAddItem={this.handleAddItem} />
          <Menu menu="entrees" onAddItem={this.handleAddItem} />
          <Menu menu="desserts" onAddItem={this.handleAddItem} />
        </Col>
        <Col xs={12} sm={4}>
          <OrderSummary
            order={this.state}
            onRemoveItem={this.handleRemoveItem}
            onSetOrderMethod={this.handleSetOrderMethod}
          />
        </Col>
      </Row>
    </div>);
  }
}

Order.propTypes = {};

export default Order;
