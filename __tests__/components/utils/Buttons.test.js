import React from "react";
import { shallow } from "enzyme";

import {
  CreateButton,
  DeleteButton
} from "../../../src/components/utils/Buttons";

/** ----------------------------------------------------------------------------
 * Create button testing
 */
const targetUrl = "https://myurl.com";
let createButton, createLink;
describe("Create button", () => {
  // ---------- With URL
  describe("with an URL", () => {
    beforeEach(() => {
      createButton = shallow(<CreateButton url={targetUrl} />);
      createLink = createButton.find("Link");
    });

    it("renders a Link", () => {
      expect(createButton.find("div").length).toEqual(0);
      expect(createLink.length).toEqual(1);
    });

    it("Link goes to provided url", () => {
      expect(createLink.props().to).toEqual(targetUrl);
    });

    it.skip("Link has expected text", () => {
      //   let pouet = createLink.findWhere(n => n.text() === targetUrl);
      //   console.log(createLink.text());
      //   // console.log(createLink.html());
      //   console.log(pouet.length);
      //   let plop = createLink.children().contains(`<span>${targetUrl}</span>`);
      //   console.log(plop);
      //   console.log(createLink.children().contains(targetUrl));
      //   //   expect(createLink.find(`span:contains('${targetUrl}')`)).toEqual(1);
    });
  });

  // ---------- Without URL
  describe("without an URL", () => {
    beforeEach(() => (createButton = shallow(<CreateButton />)));

    it("renders a simple div", () => {
      expect(createButton.find("div").length).toEqual(1);
      expect(createButton.find("Link").length).toEqual(0);
    });
  });
});

/** ----------------------------------------------------------------------------
 * Delete
 */

let deleteButton, deleteButtonTag, onDeleteFn;

describe("Delete button", () => {
  beforeEach(() => {
    onDeleteFn = jest.fn();
    deleteButton = shallow(<DeleteButton deleteFunc={onDeleteFn} />);
    deleteButtonTag = deleteButton.find("button");
  });

  it("renders one button", () => {
    expect(deleteButtonTag.length).toEqual(1);
  });

  it("click triggers delete function", () => {
    deleteButton.simulate("click");
    expect(onDeleteFn).toBeCalled();
  });

  it("renders trash icon", () => {
    let trashIcon = <span className="fas fa-trash" />;
    expect(deleteButtonTag.contains(trashIcon)).toBeTruthy();
  });

  it("renders 'Delete' text by default", () => {
    let deleteText = <span>Delete</span>;
    expect(deleteButtonTag.contains(deleteText)).toBeTruthy();
  });
});
