import React from "react";
import { shallow } from "enzyme";
import App from "../src/App";

describe("App", () => {
  let app;

  beforeEach(() => {
    app = shallow(<App />);
  });

  it("App renders Router", () => {
    expect(app.find("Router").length).toEqual(1);
  });
});
