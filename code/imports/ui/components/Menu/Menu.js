import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Button, Table } from 'react-bootstrap';
import { capitalize } from '@cleverbeagle/strings';
import centsToDollars from '../../../modules/cents-to-dollars';

const getMenuItems = menu => ({
  appetizers: [
    { name: 'Chicken wings', price: 1000 },
    { name: 'Breadsticks', price: 700 },
    { name: 'Calamari', price: 1000 },
  ],
  entrees: [
    { name: 'Lasagna', price: 1000 },
    { name: '10" Pizza', price: 1200 },
    { name: 'Human Ear', price: 20000 },
  ],
  desserts: [
    { name: 'Ice Cream Cone', price: 100 },
    { name: 'Slice of Cheesecake', price: 500 },
    { name: '3 Cookies', price: 300 },
  ],
}[menu]);

const Menu = ({ menu, onAddItem }) => (
  <Panel header={capitalize(menu)} eventKey={menu}>
    <Table bordered>
      <tbody>
        {getMenuItems(menu).map((item) => {
          const { name, price } = item;
          return (<tr key={`${menu}_${name}`}>
            <td className="vertical-align-middle">
              <p className="pull-left">{name} - <strong>${centsToDollars(price)}</strong></p>
              <Button
                className="pull-right"
                bsStyle="success"
                onClick={() => onAddItem(item)}
              >Add to Order</Button>
            </td>
          </tr>);
        })}
      </tbody>
    </Table>
  </Panel>
);

Menu.propTypes = {
  menu: PropTypes.string.isRequired,
  onAddItem: PropTypes.func.isRequired,
};

export default Menu;
