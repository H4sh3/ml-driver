import { createUseStyles } from 'react-jss';

export default createUseStyles({
  grid: {
    display: 'grid',
    gridTemplateRows: 'repeat(23, 1fr)',
    gridTemplateColumns: 'repeat(68, 1fr)',
    width: '80vmin',
    height: '50vmin',
    border: '2px solid black',
  },
  cell: {
    cursor: 'pointer',
    border: '2px solid black',
    background: 'white',
    transition: 'all 200ms linear',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
});