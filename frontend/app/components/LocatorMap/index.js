import React from 'react';
import PropTypes from 'prop-types';
import { Marker, Polyline, TileLayer } from 'react-leaflet';
import { divIcon } from 'leaflet';
import StyledMap from './Wrapper';

export default class LocatorMap extends React.Component {

  getMarkerIcon = (c, selectedId, hoveredId) => {
    let html = ' ';
    let iconSize = [12, 12];
    let className = `icon ${c.source}`;
    if (hoveredId === c.id) {
      className += ' hovered';
      iconSize = [18, 18];
    }
    if (selectedId === c.id) {
      className += ' selected';
      iconSize = [32, 32];
      html = '<div class="car"></div>';
    }
    return divIcon({ html, iconSize, className });
  };

  render() {
    const selectedId = this.props.position.selected.id;
    const hoveredId = this.props.position.hovered ? this.props.position.hovered.id : null;
    const height = this.props.tableVisible ? '50%' : '100%';
    const polylinePositions = this.props.data.map((c) => [c.loc_lat, c.loc_lon]);
    // I have to disable Polyline in tests, because of error: TypeError: Cannot read property '_layerAdd' of null
    const polyline = process.env.NODE_ENV !== 'test' ? (
      <Polyline
        positions={polylinePositions}
        color="red"
        opacity={0.5}
        weight={5}
      />
    ) : '';
    return (
      <StyledMap
        style={{ height }}
        center={[this.props.position.selected.loc_lat, this.props.position.selected.loc_lon]}
        zoom={13}
        className="map"
        animate
      >
        <TileLayer
          url="//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {this.props.data.map((c) =>
          (<Marker
            key={c.id}
            position={[c.loc_lat, c.loc_lon]}
            icon={this.getMarkerIcon(c, selectedId, hoveredId)}
            onClick={() => this.props.onCoordSelected(c, this.props.position)}
            onMouseOver={() => this.props.onCoordHovered(c)}
            onFocus={() => this.props.onCoordHovered(c)}
            onMouseOut={() => this.props.onCoordHovered(null)}
            onBlur={() => this.props.onCoordHovered(null)}
          >
          </Marker>)
        )}
        {polyline}
      </StyledMap>
    );
  }
}

LocatorMap.propTypes = {
  tableVisible: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  position: PropTypes.shape({
    offset: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    selected: PropTypes.shape({
      id: PropTypes.number.isRequired,
      loc_lat: PropTypes.number.isRequired,
      loc_lon: PropTypes.number.isRequired,
    }).isRequired,
    hovered: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
  onCoordSelected: PropTypes.func.isRequired,
  onCoordHovered: PropTypes.func.isRequired,
};
