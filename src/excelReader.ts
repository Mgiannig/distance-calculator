import { BranchOffice } from "./model/branch-office";
import path from "path";
import reader from "xlsx";

export function getBranchesFromFile(): BranchOffice[] {
  const filePath = path.join(__dirname, "..", "sucursales.xlsx");
  const file = reader.readFile(filePath);
  const data: BranchOffice[] = [];
  const sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach((res: any) => {
      data.push(res);
    });
  }

  return data;
}
