import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { saveAs } from "file-saver"; // import file saver

import Example from "./example.jsx";

// based on https://stackoverflow.com/questions/44686077/how-to-use-jest-to-test-file-download
// import FileSaver from "file-saver";
// vi.mock("file-saver", () => {
//   return {
//     default: { saveAs: vi.fn() },
//     saveAs: vi.fn(),
//   };
// });

//Mock file-saver
vi.mock("file-saver", async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    saveAs: vi.fn(),
  };
});

// Mock URL.createObjectURL using vi.fn() and add it in your beforeach
global.URL.createObjectURL = vi.fn(() => "blob:mock-url");

describe("donwload file test", () => {
  test("check template download", async () => {
    const user = userEvent.setup();
    const { container } = render(<Example />);
    expect(screen.getAllByText(/First Name/i).length).toBe(1);

    const btn = screen.getByText(/download/i, {
      selector: "button",
    });
    expect(btn).toBeInTheDocument();

    await user.click(btn);
    // TODO: find a way to test this.
    // all my experiments with mocking did not work.
    // tried as above - source
    // https://stackoverflow.com/questions/44686077/how-to-use-jest-to-test-file-download
    // minimal demo at
    // https://codesandbox.io/p/devbox/romantic-frost-xfxs3m?file=%2Fsrc%2FMyExample%2Findex.test.jsx%3A11%2C21
    // stackoverflow question at
    // https://stackoverflow.com/questions/78124492/vitest-react-write-excel-file-how-to-test-filesaver-saveas-download-file

    // const spy = vi.spyOn(MyImportFile, "handleDownloadExampleXLSX");
    // expect(spy).toHaveBeenCalled();
    // expect(fsSaveAs).toHaveBeenCalled();
    // expect(FileSaver.saveAs).toHaveBeenCalledWith(
    //     {
    //         size: 6638,
    //         options: {
    //             type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //         },
    //     },
    //     "template SuS.xlsx"
    // );

    //expect(saveAs).toHaveBeenCalled();
  });
});
