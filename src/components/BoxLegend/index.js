import React from 'react';
import Typography from '@material-ui/core/Typography';

const GREEN_COLOR = '#00796b';
const styles = {
  box: {
    backgroundColor: '#fff',
    margin: '5px 0px',
    padding: '5px 1px',
    textAlign: 'center',
    color: '#fff',
    width: '35px',
    borderRadius: '10px 10px 0px 0px',
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10px',
    alignItems: 'center',
  },
};

const BoxLegend = (props) => {
  return (
    <>
      <Typography variant="subtitle1">Legenda: </Typography>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
            <div style={styles.flex}>
          <div style={{ ...styles.box, ...{ backgroundColor: GREEN_COLOR } }}>
                    1
          </div>
              <Typography variant="body1">Disponível </Typography>
        </div>
        <div style={styles.flex}>
              <div style={{ ...styles.box, ...{ backgroundColor: '#27ae60' } }}>
              1
          </div>
          <Typography variant="body1">Selecionado </Typography>
          </div>
            <div style={styles.flex}>
          <div style={{ ...styles.box, ...{ backgroundColor: '#7f8c8d' } }}>
                    1
          </div>
          <Typography variant="body1">Reservado </Typography>
        </div>
        </div>
      </>
  );
};

export default BoxLegend;
