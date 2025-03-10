import { useEffect, useState } from "react";
import { createRow, deleteRow, fetchRowList, updateRow } from "../../server/APIServer";
import {  Box, Button, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import {  RowData } from "../../dataStructure";
import "./CMP.scss";
import TableIcon from "../../assets/img/icon_table.svg";
import TrashIcon from "../../assets/img/TrashFill.svg";
import CMPTableCell from "./CMPTableCell";
import { columnsCMP } from "../../constData";
import { transformRowData, transformToServerRow } from "./transformData";
import React from "react";


export default function CMP() {
    const [rowData, setRowData] = useState<RowData[] | null>(null);
    const [editingRow, setEditingRow] = useState<number | null>(null); 
    const [isCreatingNewRow, setIsCreatingNewRow] = useState<boolean>(false);
    const [parentId, setParentId] = useState<number|null>(null);
    const [mouseRowId, setMouseRowId] = useState<number|null>(null);

    useEffect(() => {

        fetchRowList().then(data => {
            if(data){

                if (data.length === 0) {  

                    handleCreateRow();

                } else {

                    setRowData(data);

                }
            }
                
        })
        .catch(error => {
                console.error('Error initializing data:', error);
        });
        
    }, []);

    const updateRowDataById = (data: RowData[], id: number, updatedRow: RowData): RowData[] => {

        return data.map(row => {
          if (row.id === id) {
            return { ...row, ...updatedRow };
          }

          if (row.child && row.child.length > 0) {
            return { ...row, child: updateRowDataById(row.child, id, updatedRow) };
          }

          return row;
        });
      };

    const handleCreateRow = (parent_id: number | null = null) => {
        if(editingRow !== null && isCreatingNewRow) return
        
        const newEmptyRow: RowData = {
          id: Date.now(),  
          rowName: '',
          total: 0,
          salary: 0,
          mimExploitation: 0,
          machineOperatorSalary: 0,
          materials: 0,
          mainCosts: 0,
          supportCosts: 0,
          equipmentCosts: 0,
          overheads: 0,
          estimatedProfit: 0,
          child: []
        };
      
        const addRowToTree = (data: RowData[], parentId: number | null): RowData[] =>
            data.map(row =>
              row.id === parentId
                ? { ...row, child: [...row.child, newEmptyRow] }
                : { ...row, child: addRowToTree(row.child, parentId) }
        );
        
        setRowData(prevData =>
            parent_id !== null ? addRowToTree(prevData || [], parent_id) : [...(prevData || []), newEmptyRow]
        );
        
        setEditingRow(newEmptyRow.id);
        setIsCreatingNewRow(true);
        setParentId(parent_id);

    };

    const saveNewRow = (row: RowData) => {
        const createNewRow = transformRowData(row, parentId);

        createRow(createNewRow).then(data=>{
            
            setRowData((prevData) => updateRowDataById(prevData || [], row.id, data.current))
            setIsCreatingNewRow(false);
            setEditingRow(null);
            setParentId(null);
        })
    }

    const handleDoubleClick = (id: number) =>{ setEditingRow(id)}

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, row: RowData) => {
        const { name, value } = e.target;

        const updateRowInTree = (data: RowData[]): RowData[] =>
            data.map(item =>
              item.id === row.id
                ? { ...item, [name]: value }
                : { ...item, child: updateRowInTree(item.child) }
            );
        
        setRowData(prevData => updateRowInTree(prevData || []));
    };

    const handleUpdateRow = (row: RowData) => {
        if(isCreatingNewRow){

            saveNewRow(row)
        }
        else{

            const toServerRow = transformToServerRow(row)
           
            updateRow(toServerRow, row.id).then(data =>{
                setRowData((prevData) => updateRowDataById(prevData || [], row.id, data.current))
            })

            setEditingRow(null)
        }    
    };
    const handleDeleteRow = (row_id: number)=>{

        deleteRow(row_id).then(data =>{
            const deleteById = (id: number, data: RowData[]): RowData[] => {
                return data.reduce((acc: RowData[], item: RowData) => {
                    if (item.id === id) {
                        // Пропускаем элемент для удаления
                        return acc;
                    }
                    // Рекурсивно обходим вложенные элементы
                    const children = item.child ? deleteById(id, item.child) : [];
                    // Добавляем элемент, если он не был удален
                    acc.push({
                        ...item,
                        child: children,
                    });
                    return acc;
                }, []);
            };

            setRowData((prevData) => deleteById(row_id, prevData || []));
    
        })
    }

    const handleMouseEnter = (row_id: number) => {

      if (editingRow !== row_id && !isCreatingNewRow) {
        setMouseRowId(row_id); 
      }
    };
  
    const handleMouseLeave = () => { setMouseRowId(null) };

    const renderRows = (rows: RowData[], depth: number = 0): JSX.Element[] =>
        rows.map((row) => (
            <React.Fragment key={row.id}>
                <TableRow     
                className="table-row"
                onDoubleClick={() => handleDoubleClick(row.id)}
                >
                <TableCell 
                            className="icon-cell"
                            component="th" 
                            scope="row" 
                            style={{ paddingLeft: depth * 20 + 10}}
                            onMouseEnter={() =>handleMouseEnter(row.id)} 
                            onMouseLeave={handleMouseLeave}>

                    <div className="icon-cell__btn-grp">

                        <Button disabled={editingRow !== null} onClick={() => handleCreateRow(row.id)} variant="iconTable">
                            <img src={TableIcon} alt=''/>
                        </Button>

                        {mouseRowId === row.id &&(
                        <Button onClick={() => handleDeleteRow(row.id)} variant="iconTable">
                            <img src={TrashIcon} alt=''/>
                        </Button>
                        )}

                    </div>
                    
                </TableCell>
                
                {columnsCMP.map((col) => (
                    <CMPTableCell
                        key={col.name}
                        isEditing={editingRow === row.id}
                        name={col.name}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleUpdateRow(row);
                        }
                        }}
                        row={row}
            
                    />
                    ))}
                    
                </TableRow>
                {row.child.length > 0 && renderRows(row.child, depth + 1)}
         </React.Fragment>
    ));

    return (
      
    <Box component="main"  className='container-main'>

        <div className="container-main__container-header">
            <div className="container-main__header">Строительно-монтажные работы</div>
        </div>

        <Divider/>

        <TableContainer >
            <Table className='table' aria-label="simple table">
                <TableHead >
                <TableRow>
                    <TableCell >Уровень</TableCell>
                    <TableCell align="left" style={{ width: '40%' }}>Наименование работ</TableCell>
                    <TableCell align="left">Основная з/п</TableCell>
                    <TableCell align="left">Оборудование</TableCell>
                    <TableCell align="left">Накладные расходы</TableCell>
                    <TableCell align="left">Сметная прибыль</TableCell>
                </TableRow> 
                </TableHead>
                <TableBody>
                {rowData && rowData?.length > 0 && renderRows(rowData || [])}
                </TableBody>
            </Table>
        </TableContainer>

    </Box>

    );
  }
  
