import React from "react";
import renderer from "react-test-renderer";

import { IdHiddenInput } from "../../../src/components/utils/Inputs";

/** ----------------------------------------------------------------------------
 * IdHiddenInput
 */
const invalidEntity = { name: "name" };
const validEntity = { id: "4", name: "name" };
describe("ID Hidden input", () => {
  describe("With an entity.id", () => {
    it("renders the hidden input", () => {
      const tree = renderer
        .create(<IdHiddenInput id={validEntity.id} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("Without an entity.id", () => {
    it("renders an empty string", () => {
      const tree = renderer
        .create(<IdHiddenInput id={invalidEntity.id} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
