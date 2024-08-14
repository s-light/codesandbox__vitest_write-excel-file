import { useMemo } from "react";
import {
  MRT_Table, //import alternative sub-component if we do not want toolbars
  useMaterialReactTable,
} from "material-react-table";

import Button from "@mui/material/Button";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";

import writeXlsxFile from "write-excel-file";
//import * as fsave from "file-saver";
import { saveAs } from "file-saver";

const data = [
  {
    firstName: "Dylan",
    lastName: "Murray",
    address: "261 Erdman Ford",
    city: "East Daphne",
    state: "Kentucky",
  },
  {
    firstName: "Raquel",
    lastName: "Kohler",
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
  {
    firstName: "Ervin",
    lastName: "Reinger",
    address: "566 Brakus Inlet",
    city: "South Linda",
    state: "West Virginia",
  },
];

const myschema = [
  {
    column: "firstName",
    type: String,
    value: (row) => row.firstName,
  },
  {
    column: "lastName",
    type: String,
    value: (row) => row.lastName,
  },
  {
    column: "city",
    type: String,
    value: (row) => row.city,
  },
  /*{
    column: "Date of Birth",
    type: Date,
    format: "mm/dd/yyyy",
    value: (row) => row.dateOfBirth,
  },*/
];

export const Example = () => {
  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: "firstName",
        header: "First Name",
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
      {
        accessorKey: "address",
        header: "Address",
      },
      {
        accessorKey: "city",
        header: "City",
      },
      {
        accessorKey: "state",
        header: "State",
      },
    ],
    []
    //end
  );

  async function handleDownloadExampleXLSX(event) {
    console.log("handleDownloadExampleXLSX");
    console.log("data", data);
    console.log("myschema", myschema);
    const fileName = `data_test.xlsx`;
    const xlsxBlob = await writeXlsxFile(data, {
      schema: myschema,
      // fileName: fileName,
    });
    console.log("xlsxBlob", xlsxBlob, "\n", `fileName '${fileName}'`);
    try {
      saveAs(xlsxBlob, fileName);
    } catch (error) {
      console.log(error);
    }

    // var blob = new Blob(["Hello, world!"], {
    //   type: "text/plain;charset=utf-8",
    // });
    // saveAs(blob, "downloaded.txt");
  }

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.default, //change default background color
    }),
    muiTableBodyRowProps: { hover: false },
    muiTableProps: {
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
        caption: {
          captionSide: "top",
        },
      },
    },
    muiTableHeadCellProps: {
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
        fontStyle: "italic",
        fontWeight: "normal",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
      },
    },
    renderCaption: ({ table }) =>
      `rendering ${table.getRowModel().rows.length} rows.`,
  });

  //using MRT_Table instead of MaterialReactTable if we do not need any of the toolbar components or features
  return (
    <div>
      <Button
        onClick={handleDownloadExampleXLSX}
        startIcon={<FileDownloadRoundedIcon />}
      >
        download table data as XLSX - this only works in stand-alone preview
        window.
      </Button>
      <MRT_Table table={table} />
    </div>
  );
};

export default Example;
