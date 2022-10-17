import supertest from 'supertest';
import app from '..';
import fs from 'fs';
import path from 'path';

const request = supertest(app);

describe('Testing getImage API', () => {
  it('fetches original image without scaling', async () => {
    await request.get('/api/getImage?fileName=pikachu').expect(200);
    const isFileSaved: boolean = fs.existsSync(
      path.join(__dirname, '../../assets/images/pikachu.jpg')
    );
    expect(isFileSaved).toEqual(true);
  });

  it('fetches original image with scaling height only', async () => {
    await request.get('/api/getImage?fileName=pikachu&height=200').expect(200);
    // Get check if new image has been created
    const isFileSaved: boolean = fs.existsSync(
      path.join(__dirname, '../../assets/images/pikachu_h_200.jpg')
    );
    expect(isFileSaved).toEqual(true);
  });

  it('fetches original image with scaling width only', async () => {
    await request.get('/api/getImage?fileName=pikachu&width=200').expect(200);
    const isFileSaved: boolean = fs.existsSync(
      path.join(__dirname, '../../assets/images/pikachu_w_200.jpg')
    );
    expect(isFileSaved).toEqual(true);
  });

  it('fetches original image with scaling height and width', async () => {
    await request
      .get('/api/getImage?fileName=pikachu&height=200&width=200')
      .expect(200);
    const isFileSaved: boolean = fs.existsSync(
      path.join(__dirname, '../../assets/images/pikachu_h_200_w_200.jpg')
    );
    expect(isFileSaved).toEqual(true);
  });
});
