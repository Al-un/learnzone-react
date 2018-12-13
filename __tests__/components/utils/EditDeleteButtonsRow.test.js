import React from "react";
import { shallow } from "enzyme";

import EditDeleteButtonsRow from "../../../src/components/utils/EditDeleteButtonsRow";

let editPath, deleteFunc;
describe("Edit Delete buttons row", () => {
  beforeEach(() => {
    editPath = "somewhere";
    deleteFunc = jest.fn();
  });

  it.skip("render without crash", () => {
    shallow(
      <EditDeleteButtonsRow deleteFunc={deleteFunc} editPath={editPath} />
    );
  });
});
