import { Router } from "express"
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

router.post('/', async (request, response) => {
    try {
        const { bio, picture, name, email, hashed_password } = request.body

        await profileService.createProfile({ bio, picture, name, email, hashed_password })
        response.status(201).send('Profile created successfully.')
    } 
    catch (error) {
        response.status(400).send(error.message)
    }
})

router.put('/', async (request, response) => {
    try {
        const { id, bio, picture, userId } = request.body
        
        await profileService.updateProfile({ id, bio, picture, userId })
        response.status(200).send('Profile successfully updated.')
    } 
    catch (error) {
        response.status(400).send(error.message)
    }
})

router.delete('/', async (request, response) => {
    try {
        const idProfile = request.body

        await profileService.deleteProfile(idProfile)
        response.status(200).send('Profile successfully deleted.')
    } 
    catch (error) {
        response.status(400).send(error.message)
    }
})

export default router