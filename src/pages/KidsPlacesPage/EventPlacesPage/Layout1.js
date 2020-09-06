import React from 'react';

import PlaceItem from '../../../components/PlaceItem';

const styles = {
  lugar: {
    padding: '14px',
    backgroundColor: '#00796b',
    borderRadius: '10px',
    marginRight: '10px',
    color: '#fff',
    fontStyle: 'bold',
    marginTop: '10px',
  },
  vazio: {
    padding: '14px',
    marginRight: '10px',
    marginTop: '10px',
  },
};

const Layout1 = (props) => {
  return (
    <div>
      <div className="place" id="place1" style={styles.lugar}>
            1
      </div>
          <div className="place" style={styles.vazio} />
      <div className="place" style={styles.lugar}>
            2
      </div>
          <div className="place" id="place1" style={styles.lugar}>
          3
      </div>
          <div className="place" style={styles.vazio} />
          <div className="place" id="place1" style={styles.lugar}>
          4
      </div>
          <div className="place" id="place1" style={styles.lugar}>
          5
      </div>
      <div className="place" style={styles.vazio} />
          <div className="place" id="place1" style={styles.lugar}>
          6
      </div>
      <div className="place" style={styles.vazio} />
          <div className="place" id="place1" style={styles.lugar}>
          7
      </div>
      </div>
  );
};

const PlacesRow = (props) => {
  const { initial } = props;
  const { final } = props;
  const row = [...Array(final - initial)];

  return (
    <div>
      {row.map((place, i) => (
        <div id={`place${initial + i}`}>{props.lugares[initial + i]}</div>
      ))}
      </div>
  );
};

export default Layout1;
