import { Router } from "express"
import { profileValidate, profileSchema } from "../middleware/profileValidate"
import { ProfileService } from "../services/profileService"

const router = Router()
const profileService = new ProfileService()

router.get('/', async (request, response) => {
    try {
        const profiles = await profileService.getProfile()

        response.status(200).json(profiles)

    } catch (error) {
        response.status(400).send(error.message)
    }
})

router.post('/', profileValidate(profileSchema.create), async (request, response) => {
    try {
        const { bio, picture, name, email, hashed_password } = request.body

        await profileService.createProfile({ bio, picture, name, email, hashed_password })
        response.status(201).send('Profile created successfully.')
    }
    catch (error) {
        response.status(400).send(error.message)
    }
})

router.put('/', profileValidate(profileSchema.update), async (request, response) => {
    try {
        const { id, bio, picture, userId } = request.body

        await profileService.updateProfile({ id, bio, picture, userId })
        response.status(200).send('Profile successfully updated.')
    }
    catch (error) {
        response.status(400).send(error.message)
    }
})

router.delete('/', profileValidate(profileSchema.delete), async (request, response) => {
    try {
        const { id } = request.body

        await profileService.deleteProfile({ id })
        response.status(200).send('Profile successfully deleted.')
    }
    catch (error) {
        response.status(400).send(error.message)
    }
})

export default router