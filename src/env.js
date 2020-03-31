export const BASE_URL = 'http://localhost:3003/api';
export const OAPI_URL = 'http://localhost:3003/oapi';
//export const BASE_URL = 'http://ec2-54-86-62-158.compute-1.amazonaws.com:3003/api';
//export const OAPI_URL = 'http://ec2-54-86-62-158.compute-1.amazonaws.com:3003/oapi';
/* https://finexbackend.herokuapp.com/api */

export const tableOptions = {
    filterType: 'dropdown',
    responsive: 'scrollMaxHeight',
    textLabels: {
      body: {
        noMatch: "Nenhum dado encontrado",
        toolTip: "Sort",
      },
      pagination: {
        next: "Próxima Página",
        previous: "Página Anterior",
        rowsPerPage: "Linhas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Pesquisar",
        downloadCsv: "Download CSV",
        print: "Imprimir",
        viewColumns: "Colunas a Exibir",
        filterTable: "Filtrar",
      },
      filter: {
        all: "Todos",
        title: "Filtros",
        reset: "Redefinir",
      },
      viewColumns: {
        title: "Mostrar Colunas",
        titleAria: "Mostrar/Ocultar Colunas",
      },
      selectedRows: {
        text: "linha(s) selecionada(s)",
        delete: "Remover",
        deleteAria: "Remover Linhas Selecionadas",
      },
    }
    
  }