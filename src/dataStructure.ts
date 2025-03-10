export interface ToServerData{
    equipmentCosts: number,
    estimatedProfit: number,
    machineOperatorSalary: number,
    mainCosts: number,
    materials: number,
    mimExploitation: number,
    overheads: number,
    rowName: string,
    salary: number,
    supportCosts: number
}
export interface CreateRowData extends ToServerData{
    parentId: number | null,
}

export interface RowData{
    child: RowData[],
    equipmentCosts: number,
    estimatedProfit: number,
    id: number,
    machineOperatorSalary: number,
    mainCosts: number,
    materials: number,
    mimExploitation: number,
    overheads: number,
    rowName: string,
    salary: number,
    supportCosts: number,
    total: number
  }
export interface CMPTableCellProps {
    isEditing: boolean;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, row: RowData) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, row: RowData) => void;
    row: RowData;

  }