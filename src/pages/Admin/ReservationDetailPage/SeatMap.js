import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
 
import Typography from '@material-ui/core/Typography'; 

import api from '../../../services/api';
import layouts from './../../../config/layouts';

const GREEN_COLOR = '#00796b';
const styles = {
  box: {
    backgroundColor: '#fff',
    margin: '5px 0px',
    padding: '5px 1px',
    textAlign: 'center',
    color: '#fff',
    borderRadius: '10px 10px 0px 0px',
    minWidth: '100px',
  },
  container: {},
  palco: {
    background: GREEN_COLOR,
    width: '80%',
    height: '100px',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    marginBottom: '20px',
  },
  place: {
    border: '1px solid #ccc',
    padding: '2px',
  },
  place_positions: {},
  flex: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '10px',
  },
};

const BoxLugar = ({ lugar }) => {
  return lugar ? (
    <div
        key={lugar.number}
        style={{
        ...styles.box,
        ...{
          backgroundColor:
            lugar.status === 'D'
              ? lugar.selecionado
                ? '#27ae60'
                : GREEN_COLOR
              : lugar.status === 'R' && '#7f8c8d',
        },
      }}
      >
          <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="caption">{lugar.number}</Typography>
        <Typography variant="caption">{lugar.nome_reservado}</Typography>
      </div>
      </div>
  ) : (
    <div style={{ height: '28px', width: '10px' }} />
  );
};

BoxLugar.propTypes = {
  lugar: PropTypes.shape({
    nome_reservado: PropTypes.any,
    number: PropTypes.any,
    selecionado: PropTypes.any,
    status: PropTypes.string
  })
}


const SeatMap = (props) => { 
  const [layoutSelecionado, setLayoutSelecionado] = useState([]); 
  const params = useParams();

  useEffect(() => {
    api.get(`/lugar/evento/${params.id}`).then((res) => {
      const tipoEvento = res.data.evento.tipoLayout;
      let layout = layouts[tipoEvento];
      const resLugares = res.data.lugares;
      const lugaresTemp = resLugares;
try{
      layout = layout.map((linha) => {
        return linha.map((coluna) => {
          const result = lugaresTemp.filter(
            (l) => coluna && parseInt(l.posicao) === coluna.number
          );
          return result[0] && { ...coluna, ...result[0] };
        });
      });
      console.log(layout); 
      setLayoutSelecionado(layout);
    }catch(e){
      console.log("Sem Cadeiras" + e.message);
    }
    });
  }, [params.id]);

  /* useEffect(() => {
    console.log(layoutSelecionado);
  }, [layoutSelecionado]); */

  return (
    <div>
      <div style={styles.container}>
        <div className="places_div" style={styles.place}>
              <div style={styles.palco}>
            <Typography variant="h6">Palco</Typography>
          </div>

              <div style={styles.place_positions}>
                <table cellSpacing="0" cellPadding="0" style={{ width: '100%' }}>
                <tbody>
                  {layoutSelecionado.map((linha, i) => (
                        <tr key={i}>
                    {linha.map((lugar, j) => {
                      return (
                        <td key={j}>
                          <BoxLugar lugar={lugar} />
                          </td>
                      );
                    })}
                    </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SeatMap;
