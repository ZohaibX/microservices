export const stripe = {
  charges: {
    create: jest.fn().mockResolvedValue({}), // in actual, we are awaiting this req, so in mock , this fn will automatically be resolved with {}
  },
};
