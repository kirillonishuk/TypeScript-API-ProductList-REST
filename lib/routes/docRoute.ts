import { Request, Response } from 'express';
import * as path from 'path';

export class DocumentationRoute {
    public routes(app): void {
        app.route('/doc')
            .get((req: Request, res: Response) => {
                res.set('Content-Type', 'text/html');
                res.sendFile(path.join(__dirname, '../../doc/index.html'));
            })
        app.route('/')
            .get((req: Request, res: Response) => {
                res.redirect('/doc');
            })
    };
}