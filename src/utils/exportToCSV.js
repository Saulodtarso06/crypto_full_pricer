import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';

export const exportToCSV = (data, filename = 'dados_criptomoedas.csv') => {
  const csv = unparse(data); // Converte array de objetos em string CSV
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
};
