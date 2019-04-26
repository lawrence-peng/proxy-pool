"use strict";
const expect = require("chai").expect;
const { HttpProxyPool } = require("../dist/index");
const MeProxySupplier = require("./supplier/MeProxySupplier");

describe("HttpProxyPool function getProxy", () => {
  before(() => {
    this.pool = new HttpProxyPool(new MeProxySupplier(), {
      fetchInterval: 2000,
      poolThreshold: 50
    });
  });
  it("poll return proxy", async () => {
    setInterval(async () => {
      const result = await this.pool.getProxy();
      console.log(result);
    }, 5000);
  }).timeout(600000000);

  // it("should return proxy", async () => {
  //   const result = await this.pool.getProxy();
  //   expect(result).to.have.property("host");
  //   expect(result).to.have.property("port");
  //   expect(result).to.have.property("address");
  // }).timeout(30000);
});
