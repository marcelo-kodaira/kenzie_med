import * as express from "express"

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string
        crm: string
        isAdmin: boolean
      }
    }
  }
}
