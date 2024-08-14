import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MyExample from "./example";

// based on https://stackoverflow.com/questions/44686077/how-to-use-jest-to-test-file-download
// import FileSaver from "file-saver";
// vi.mock("file-saver", () => {
//   return {
//     default: { saveAs: vi.fn() },
//     saveAs: vi.fn(),
//   };
// });

// global.Blob = function (content, options) {
//   return { content, options };
// };

import { saveAs } from "file-saver"; // import file saver
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

describe("MyExample", () => {
  test("check template download", async () => {
    const user = userEvent.setup();
    const { container } = render(<MyExample />);
    const btn = screen.getByText(/Download/i, {
      selector: "button",
    });
    expect(btn).toBeInTheDocument();
    await user.click(btn);

    expect(saveAs).toHaveBeenCalled();
    expect(saveAs).toHaveBeenCalledWith(
      {
        size: 5531,
        options: {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      },
      "testFile.xlsx"
    );
  });
});
