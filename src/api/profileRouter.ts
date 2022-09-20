import { Router } from "express"
import { ProfileService } from "../services/profileService"

const router = Router()

const profileService = new ProfileService()

router.get('/', async (req, res) => {
    try {
        const profile = await profileService.getProfile()

        res.status(200).json(profile)

    } catch (err) {
        res.status(400).send()
    }
})

router.post('/', async (req, res) => {
    try {
        const dataTDO = req.body

        await profileService.createProfile(dataTDO)

        res.status(200).send('Profile created successfully.')
    } catch (err) {
        res.status(400).send(err.message)
    }
})

export default router