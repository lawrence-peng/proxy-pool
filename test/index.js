"use strict";
const expect = require("chai").expect;
const { HttpProxyPool } = require("../dist/index");
const KaidiProxySupplier = require("./supplier/KaidiProxySupplier");

describe("HttpProxyPool function getProxy", () => {
  before(() => {
    this.pool = new HttpProxyPool(new KaidiProxySupplier());
  });
  it("should return proxy", async () => {
    const result = await this.pool.getProxy();
    expect(result).to.have.property("host");
    expect(result).to.have.property("port");
    expect(result).to.have.property("address");
  }).timeout(30000);
});
