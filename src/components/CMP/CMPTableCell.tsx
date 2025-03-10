import React from 'react';
import { TextField, TableCell } from '@mui/material';
import { CMPTableCellProps } from '../../dataStructure';

const CMPTableCell: React.FC<CMPTableCellProps> = ({ isEditing, name, onChange, onKeyDown, row,  }) => {
  return (
    <TableCell align={'left'}>
      {isEditing ? (
        <TextField
          name={name}
          defaultValue={(row as any)[name]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, row)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => onKeyDown(e, row)}
        />
      ) : (
        (row as any)[name]
      )}
    </TableCell>
  );
};

export default CMPTableCell;
