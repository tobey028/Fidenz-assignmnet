export class IndexController {
    public async getHello(req: Request, res: Response): Promise<void> {
        res.json({ message: "Hello, World!" });
    }

    // Add more methods to handle other routes as needed
}