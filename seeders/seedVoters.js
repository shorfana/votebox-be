module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Voters", [
      { principalId: "sample-principal-id-1", createdAt: new Date() },
      { principalId: "sample-principal-id-2", createdAt: new Date() },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("Voters", null, {});
  },
};
