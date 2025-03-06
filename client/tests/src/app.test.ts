import App from '../../src/App';

describe('Client app', () => {
  it('should contain "Boggle"', () => {
    const app =  App();
    expect(app).toContain('Boggle');
  });
});