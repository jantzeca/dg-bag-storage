import { Router, Request, Response } from 'express'
import { IBag } from '../models/Bag'
import BagRepository from '../repositories/bagRepository'

class BagController {
  private router: Router
  private repository: BagRepository

  get Router(): Router {
    return this.router
  }

  constructor() {
    this.router = Router()
    this.repository = new BagRepository()
    this.routes()
  }

  public routes(): void {
    this.router.post('/create', async (req: Request, res: Response) => {
      const { name, discs }: { name: string; discs?: [string] } = req.body

      try {
        const bag: IBag | string = await this.repository.createBag(name, discs)
        return typeof bag === 'string'
          ? res.status(400).send(bag)
          : res.status(201).json({ bag })
      } catch (err) {
        res.status(400).send(err.message)
      }
    })

    this.router.get('/getAllBags', async (req: Request, res: Response) => {
      try {
        const bags: Array<IBag> | null = await this.repository.getAllBags()
        return !bags ? res.status(404).send('No bags found') : res.status(200).json(bags)
      } catch (err) {
        res.status(400).send(err.message)
      }
    })

    this.router.get('/getBagById/:id', async (req: Request, res: Response) => {
      const { id } = req.params

      try {
        const bag: IBag | null = await this.repository.getBagById(id)
        return !bag
          ? res.status(404).send('Bag of that Id not found')
          : res.status(200).json(bag)
      } catch (err) {
        res.send(400).send(err.message)
      }
    })

    this.router.delete('/delete/:id', async (req: Request, res: Response) => {
      const { id } = req.params

      try {
        const message: boolean = await this.repository.deleteBag(id)
        return message ? res.sendStatus(204) : res.status(404).send('Bag Not Found')
      } catch (err) {
        res.send(400).send(err.message)
      }
    })
  }
}

export default BagController
