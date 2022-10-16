import { Request, Response, Router } from "express";
import getImageRoute from "./api/getImage";

const routes = Router();

routes.use('/api', getImageRoute);

routes.get('*', (req: Request, res: Response) => {
    res.status(404);
    res.send('<h1>Page is not found</h1>');
});

export default routes;