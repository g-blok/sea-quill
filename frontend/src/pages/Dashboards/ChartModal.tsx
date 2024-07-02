import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface ChartModalProps {
  open: boolean;
  onClose: () => void;
  chart: any;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ChartModal: React.FC<ChartModalProps> = ({ open, onClose, chart }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {chart.name}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {chart.sql_query}
        </Typography>
        <Button onClick={onClose} variant="contained" color="primary" sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ChartModal;
