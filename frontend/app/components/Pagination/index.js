import React from 'react';
import PropTypes from 'prop-types';
import StyledPagination from './Wrapper';

export default class Pagination extends React.PureComponent {
  render() {
    const prevDisabled = this.props.fetching || this.props.position.offset <= 1;
    const nextDisabled = this.props.fetching || this.props.position.offset + this.props.position.limit > this.props.totalCount;
    return (
      <StyledPagination>
        <button
          onClick={this.props.onOffsetDecrease}
          disabled={prevDisabled}
        >{'<<'}</button>
        <button
          type="button"
          onClick={this.props.onOffsetReset}
          disabled={this.props.fetching}
          className="refresh"
        />
        <button
          onClick={this.props.onOffsetIncrease}
          disabled={nextDisabled}
        >{'>>'}</button>
        <button
          onClick={this.props.onTableVisibleToggle}
          className="toggle"
        />
        <div className="pager floated">
          <span className="stat">
            {this.props.position.offset + 1} -
          </span>
          <select
            value={this.props.position.limit}
            title="per page"
            disabled={this.props.fetching}
            onChange={(event) => this.props.onPerPageChange(Number(event.target.value))}
          >
            {this.props.limitOptions.map(
              (i) => <option key={i} value={i}>{this.props.position.offset + i}</option>
            )}
          </select>
        </div>
      </StyledPagination>
    );
  }
}

Pagination.propTypes = {
  fetching: PropTypes.bool.isRequired,
  totalCount: PropTypes.number,
  limitOptions: PropTypes.object.isRequired,
  position: PropTypes.shape({
    offset: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    selected: PropTypes.shape({
      id: PropTypes.number.isRequired,
      loc_lat: PropTypes.number.isRequired,
      loc_lon: PropTypes.number.isRequired,
    }),
    hovered: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
  onTableVisibleToggle: PropTypes.func.isRequired,
  // onFetchCoords: PropTypes.func.isRequired,
  onPerPageChange: PropTypes.func.isRequired,
  onOffsetDecrease: PropTypes.func.isRequired,
  onOffsetIncrease: PropTypes.func.isRequired,
  onOffsetReset: PropTypes.func.isRequired,
};
