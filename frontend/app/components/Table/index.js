import React from 'react';
import PropTypes from 'prop-types';
import { FormattedRelative } from 'react-intl';
import TableHead from './TableHead';
import StyledTable from './Wrapper';

export default class Table extends React.PureComponent {

  getRowClass = (id) => {
    let classes = 'clientdatalink ';
    if (this.props.position.selected.id === id) {
      classes += 'selected ';
    }
    if (this.props.position.hovered && this.props.position.hovered.id === id) {
      classes += 'hovered ';
    }
    return classes;
  };

  render() {
    return (
      <StyledTable>
        <TableHead names={['created', 'source', 'coordinates', 'km/h', 'uptime', 'battery']} />
        <tbody>
          {this.props.data.map((item) =>
            (<tr
              key={item.id}
              className={this.getRowClass(item.id)}
              onClick={() => this.props.onCoordSelected(item, this.props.position)}
              onMouseOver={() => this.props.onCoordHovered(item)}
              onFocus={() => this.props.onCoordHovered(item)}
              onMouseOut={() => this.props.onCoordHovered(null)}
              onBlur={() => this.props.onCoordHovered(null)}
            >
              <td title={item.created}>
                <FormattedRelative
                  value={item.created}
                  style={'numeric'} // eslint-disable-line react/style-prop-object
                />
              </td>
              <td>{item.source}</td>
              <td>
                <a
                  href={`//maps.google.com/maps?q=${item.loc_lat},${item.loc_lon}`}
                  target="_blank"
                  title={`${item.loc_lat} ${item.loc_lon}`}
                >gmaps
                </a>
              </td>
              <td>{Math.round(item.loc_spd * 3.6)}</td>
              <td title={`${item.ups} seconds`}>
                <FormattedRelative
                  value={Date.now() - (item.ups * 1000)}
                  updateInterval={0}
                  style={'numeric'} // eslint-disable-line react/style-prop-object
                />
              </td>
              <td>{item.batt}</td>
            </tr>)
          )}
        </tbody>
      </StyledTable>
    );
  }
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  position: PropTypes.shape({
    offset: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    selected: PropTypes.shape({
      id: PropTypes.number.isRequired,
      loc_lat: PropTypes.number.isRequired,
      loc_lon: PropTypes.number.isRequired,
      loc_spd: PropTypes.number.isRequired,
      ups: PropTypes.number.isRequired,
      created: PropTypes.string.isRequired,
      source: PropTypes.string.isRequired,
    }).isRequired,
    hovered: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
  onCoordSelected: PropTypes.func.isRequired,
  onCoordHovered: PropTypes.func.isRequired,
};
