import PropTypes from 'prop-types';
import React from 'react';

function TableHead(props) {
  return (
    <thead>
      <tr>
        {props.names.map(
          (name) => <th key={name}>{name}</th>
        )}
      </tr>
    </thead>
  );
}

TableHead.propTypes = {
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TableHead;
