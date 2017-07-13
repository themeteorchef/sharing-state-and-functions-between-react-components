import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Button, Table, ButtonGroup, Alert } from 'react-bootstrap';
import { _ } from 'meteor/underscore';
import centsToDollars from '../../../modules/cents-to-dollars';
import Icon from '../Icon/Icon';

import './OrderSummary.scss';

const calculateTotal = (items, method) => {
  let total = method === 'delivery' ? 300 : 0;
  items.forEach(({ price }) => (total += price));
  return total;
};

const OrderSummary = ({ order, onRemoveItem, onSetOrderMethod }) => {
  const orderedItems = _.groupBy(order.items, 'name');
  const isDelivery = order.method === 'delivery';
  return (
    <div className="OrderSummary">
      <Panel>
        <div className="OrderSummary-total">
          <h5>Order Total</h5>
          <p>{`$${centsToDollars(calculateTotal(order.items, order.method))}`}</p>
        </div>
        <div className="OrderSummary-method">
          <h5>Order Method</h5>
          <ButtonGroup>
            <Button
              onClick={() => onSetOrderMethod('pickup')}
              bsStyle={order.method === 'pickup' ? 'primary' : 'default'}
            >Pickup</Button>
            <Button
              onClick={() => onSetOrderMethod('delivery')}
              bsStyle={order.method === 'delivery' ? 'primary' : 'default'}
            >Delivery</Button>
          </ButtonGroup>
        </div>
        <div className="OrderSummary-items">
          <h5>Items</h5>
          {isDelivery || order.items.length > 0 ? <Table striped bordered condensed>
            <tbody>
              {Object.keys(orderedItems).map((itemName) => {
                const items = orderedItems[itemName];
                return (<tr key={itemName}>
                  <td>
                    <span className="pull-left">{itemName} x{items.length}</span>
                    <span className="pull-right">
                      <Icon icon="remove" onClick={() => onRemoveItem(itemName)} />
                    </span>
                    <span className="pull-right">{`$${centsToDollars(calculateTotal(items))}`}</span>
                  </td>
                </tr>);
              })}
              {isDelivery ? <tr>
                <td>
                  <span className="pull-left">Delivery Charge</span>
                  <span className="pull-right">{`$${centsToDollars(300)}`}</span>
                </td>
              </tr> : ''}
            </tbody>
          </Table> : <Alert bsStyle="warning">No items yet.</Alert>}
        </div>
        <Button
          bsStyle="success"
          block
          onClick={() => alert('Just a demo here, move along.')}
        >Place Order</Button>
      </Panel>
    </div>
  );
};

OrderSummary.propTypes = {
  order: PropTypes.object.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onSetOrderMethod: PropTypes.func.isRequired,
};

export default OrderSummary;
