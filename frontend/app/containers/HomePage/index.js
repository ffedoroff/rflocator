/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Pagination from 'components/Pagination';
import LocatorMap from 'components/LocatorMap';
import Table from 'components/Table';
import { getPropsHomePage } from './selectors';
import Wrapper from './wrapper';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  onFirstLoad, onCoordHovered, onCoordSelected, onOffsetDecrease, onOffsetIncrease, onPerPageChange,
  onTableVisibleToggle, onOffsetReset,
} from './actions';


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.onFirstLoad(this.props.position.path);
  }

  render() {
    const map = this.props.position.selected ? (
      <LocatorMap
        tableVisible={this.props.tableVisible}
        data={this.props.data}
        position={this.props.position}
        onCoordSelected={this.props.onCoordSelected}
        onCoordHovered={this.props.onCoordHovered}
      />) : '';

    const table = this.props.position.selected ? (
      <Table
        tableVisible={this.props.tableVisible}
        data={this.props.data}
        position={this.props.position}
        fetching={this.props.fetching}
        onCoordSelected={this.props.onCoordSelected}
        onCoordHovered={this.props.onCoordHovered}
      />) : '';

    const title = this.props.position.selected ?
      this.context.intl.formatMessage(
        messages.title,
        { date: this.context.intl.formatRelative(new Date(this.props.position.selected.created)) },
      )
    : this.context.intl.formatMessage(messages.noUpdates);

    return (
      <Wrapper>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {map}
        {table}
        <Pagination
          fetching={this.props.fetching}
          limitOptions={this.props.limitOptions}
          position={this.props.position}
          tableVisible={this.props.tableVisible}
          totalCount={this.props.totalCount}
          onTableVisibleToggle={this.props.onTableVisibleToggle}
          onPerPageChange={this.props.onPerPageChange}
          onOffsetDecrease={this.props.onOffsetDecrease}
          onOffsetIncrease={this.props.onOffsetIncrease}
          onOffsetReset={this.props.onOffsetReset}
        />
      </Wrapper>
    );
  }
}

HomePage.propTypes = {
  fetching: PropTypes.bool.isRequired,
  totalCount: PropTypes.number,
  limitOptions: PropTypes.object.isRequired,
  tableVisible: PropTypes.bool.isRequired,
  data: PropTypes.array,
  position: PropTypes.shape({
    path: PropTypes.string.isRequired,
    offset: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    selected: PropTypes.shape({
      created: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      loc_lat: PropTypes.number.isRequired,
      loc_lon: PropTypes.number.isRequired,
    }),
    hovered: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
  onCoordSelected: PropTypes.func.isRequired,
  onCoordHovered: PropTypes.func.isRequired,
  onTableVisibleToggle: PropTypes.func.isRequired,
  onFirstLoad: PropTypes.func.isRequired,
  onPerPageChange: PropTypes.func.isRequired,
  onOffsetDecrease: PropTypes.func.isRequired,
  onOffsetIncrease: PropTypes.func.isRequired,
  onOffsetReset: PropTypes.func.isRequired,
};

HomePage.contextTypes = {
  intl: intlShape,
};

export function mapDispatchToProps(dispatch) {
  return {
    onCoordSelected: (item, position) => onCoordSelected(item, position)(dispatch),
    onCoordHovered: (item) => onCoordHovered(item)(dispatch),
    onTableVisibleToggle: () => onTableVisibleToggle()(dispatch),
    onPerPageChange: (newLimit) => onPerPageChange(newLimit)(dispatch),
    onOffsetDecrease: () => onOffsetDecrease()(dispatch),
    onOffsetIncrease: () => onOffsetIncrease()(dispatch),
    onOffsetReset: () => onOffsetReset()(dispatch),
    onFirstLoad: (path) => onFirstLoad(path)(dispatch),
  };
}

export default compose(
  injectReducer({ key: 'home', reducer }),
  injectSaga({ key: 'home', saga }),
  connect(createStructuredSelector({ ...getPropsHomePage }), mapDispatchToProps),
)(HomePage);
