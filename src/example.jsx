import * as React from "react";
import { Button } from "@mui/material";

import writeXlsxFile from "write-excel-file";

export const MyExample = () => {
  const exampleData = [
    {
      forename: "Diana",
      surname: "Umlauft",
      email: "Diana.Umlauft@gmail.com",
    },
    {
      forename: "Jana",
      surname: "Friedmann",
      email: "Jana_Friedmann@gmail.com",
    },
  ];

  const columnsDefinition = [
    {
      column: "forename",
      value: (person) => person.forename,
      type: String,
      width: 15,
    },
    {
      column: "surname",
      value: (person) => person.surname,
      type: String,
      width: 15,
    },
    {
      column: "email",
      value: (person) => person.email,
      type: String,
      width: 30,
    },
  ];

  async function handleDownloadExampleXLSX(event) {
    console.log("handleDownloadExampleXLSX");
    try {
      const xlsxBlob = await writeXlsxFile(exampleData, {
        schema: columnsDefinition,
        // https://gitlab.com/catamphetamine/write-excel-file#browser
        // when no fileName is given results in blob
        fileName: `testFile.xlsx`,
      });
      //console.log("xlsxBlob", xlsxBlob);
      // saveAs(xlsxBlob, `testFile.xlsx`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Button onClick={handleDownloadExampleXLSX}>Download Example</Button>
    </>
  );
};

export default MyExample;
