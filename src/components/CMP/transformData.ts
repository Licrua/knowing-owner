import { CreateRowData, RowData, ToServerData } from "../../dataStructure";

export  const transformRowData = (rowData: RowData, parentId: number|null): CreateRowData => {
    return {
      equipmentCosts: rowData.equipmentCosts,
      estimatedProfit: rowData.estimatedProfit,
      machineOperatorSalary: rowData.machineOperatorSalary,
      mainCosts: rowData.mainCosts,
      materials: rowData.materials,
      mimExploitation: rowData.mimExploitation,
      overheads: rowData.overheads,
      parentId: parentId,  // Устанавливаем parentId в null, так как исходный формат не имеет parentId
      rowName: rowData.rowName,
      salary: rowData.salary,
      supportCosts: rowData.supportCosts
    };
};

export  const transformToServerRow = (rowData: RowData): ToServerData => {
    return {
      equipmentCosts: rowData.equipmentCosts,
      estimatedProfit: rowData.estimatedProfit,
      machineOperatorSalary: rowData.machineOperatorSalary,
      mainCosts: rowData.mainCosts,
      materials: rowData.materials,
      mimExploitation: rowData.mimExploitation,
      overheads: rowData.overheads,     
      rowName: rowData.rowName,
      salary: rowData.salary,
      supportCosts: rowData.supportCosts
    };
};

